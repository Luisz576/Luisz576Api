import validator from "../../services/validator"
import Punishment, { IPunishment, IPunishmentCreateProps } from "../../models/punishments/Punishment"
import { Either, left, right } from "../../types/either"

export default {
    async givePunishment(data: IPunishmentCreateProps): Promise<Either<any, IPunishment>>{
        try{
            const punishment = await Punishment.create({
                player_uuid: data.player_profile.uuid,
                applicator_uuid: data.applicator_uuid,
                punishment_type: data.punishment_type,
                reason: data.reason,
                duration: data.duration,
                comment: data.comment
            })
            data.player_profile.punishment = true
            await data.player_profile.save()
            return right(punishment)
        }catch(err){
            return left(err)
        }
    },
    async getById({punishment_id}){
        return await Punishment.findById(punishment_id)
    },
    async search({player_profile_uuid, applicator_profile_uuid, deleted, is_valid}){
        const filter = {
            player_profile: player_profile_uuid
        }
        if(applicator_profile_uuid){
            filter.applicator_profile = applicator_profile_uuid
        }
        if(validator.validateBoolean(deleted)){
            filter.deleted = deleted
        }
        if(validator.validateBoolean(is_valid)){
            filter.is_valid = is_valid
        }
        const punishmentsFinded = await Punishment.find(filter)
        if(validator.validateBoolean(is_valid)){
            const punishments = []
            for(let i in punishmentsFinded){
                if(punishmentsFinded[i].stillValid()){
                    punishments.push(punishmentsFinded[i])
                }else{
                    this.pardon({
                        punishment: punishmentsFinded[i]
                    })
                }
            }
            return punishments
        }
        return punishmentsFinded
    },
    async pardon({punishment, punishment_id}){
        // punishment
        if(punishment){
            punishment.is_valid = false
            await punishment.save()
            return
        }
        // punishment_id
        const p = await Punishment.findById(punishment_id)
        if(p){
            p.is_valid = false
            await p.save()
        }
        throw 'Punishment not founded'
    },
    async pardonAll({player_profile_uuid}){
        const punishments = await this.search({player_profile_uuid, deleted: false, is_valid: true})
        for(let i in punishments){
            punishments[i].deleted = true
            punishments[i].is_valid = false
            await punishments[i].save()
        }
    }
}