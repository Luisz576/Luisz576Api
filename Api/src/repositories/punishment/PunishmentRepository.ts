import { IPlayerProfile } from "../../domain/models/player_profile/PlayerProfile"
import { IPunishment, IPunishmentCreateProps, IPunishmentSearchProps } from "../../domain/models/punishments/Punishment"
import Punishment from "../../schemas/punishment/Punishment"
import { OnlyExecutePromise, ReturnOrErrorPromise, left, right } from "../../types/either"

type CustomIPunishmentCreateProps = Omit<IPunishmentCreateProps, 'player_uuid'> & {
    player_profile: IPlayerProfile
}
type IPunishmentOrError = ReturnOrErrorPromise<IPunishment>
type MaybeIPunishmentsOrError = ReturnOrErrorPromise<IPunishment[]>

export default {
    async store(data: CustomIPunishmentCreateProps): IPunishmentOrError{
        try{
            const punishment = await Punishment.create({
                player_uuid: data.player_profile.uuid,
                applicator_uuid: data.applicator_uuid,
                punishment_type: data.punishment_type,
                reason: data.reason,
                duration: data.duration,
                comment: data.comment
            })
            if(punishment){
                data.player_profile.punishment = true
                await data.player_profile.save()
                return right(punishment)
            }
            return left("Can't create Punishment")
        }catch(err){
            return left(err)
        }
    },
    async getById(punishment_id: string){
        return await Punishment.findById(punishment_id)
    },
    async search(filter: IPunishmentSearchProps): MaybeIPunishmentsOrError{
        try{
            // const filter = {
            //     player_profile: player_profile_uuid
            // }
            // if(applicator_profile_uuid){
            //     filter.applicator_profile = applicator_profile_uuid
            // }
            // if(validator.validateBoolean(deleted)){
            //     filter.deleted = deleted
            // }
            // if(validator.validateBoolean(is_valid)){
            //     filter.is_valid = is_valid
            // }
            const punishments: IPunishment[] = []
            const punishmentsFinded = await Punishment.find(filter)
            for(let p of punishmentsFinded){
                if(p.stillValid()){
                    punishments.push(p)
                }else{
                    // expires
                    p.expires()
                    await p.save()
                    // compare filter
                    if(!filter.is_valid){
                        punishments.push(p)
                    }
                }
            }
            return right(punishments)
        }catch(err){
            return left(err)
        }
    },
    async pardon(data: {punishment?: IPunishment, punishment_id?: string}): OnlyExecutePromise{
        try{
            // punishment
            if(data.punishment){
                data.punishment.is_valid = false
                await data.punishment.save()
                return right(null)
            }
            // punishment_id
            const p = await Punishment.findById(data.punishment_id)
            if(p){
                p.is_valid = false
                await p.save()
                return right(null)
            }
            return left('Punishment not founded')
        }catch(err){
            return left(err)
        }
    },
    async pardonAllOfPlayer(player_uuid: string): OnlyExecutePromise{
        try{
            const punishments_response = await this.search({
                player_uuid,
                deleted: false,
                is_valid: true
            })
            if(punishments_response.isRight()){
                const punishments = punishments_response.value
                for(let i in punishments){
                    punishments[i].deleted = true
                    punishments[i].is_valid = false
                    await punishments[i].save()
                }
                return right(null)
            }
            return left(punishments_response.value)
        }catch(err){
            return left(err)
        }
    }
}