import { IPunishmentCreateProps, IPunishmentSearchProps } from "../../domain/models/punishments/Punishment"
import { IPunishmentRepository } from "../../domain/repositories/punishment/PunishmentRepository"
import Punishment, { IPunishmentModel } from "../../schemas/punishment/Punishment"

class PunishmentRepository implements IPunishmentRepository{
    async store(data: IPunishmentCreateProps): Promise<IPunishmentModel>{
        const punishment = await Punishment.create({
            player_uuid: data.player_uuid,
            applicator_uuid: data.applicator_uuid,
            punishment_type: data.punishment_type,
            reason: data.reason,
            duration: data.duration,
            comment: data.comment
        })
        if(punishment){
            return punishment
        }
        throw new Error("Can't create Punishment")
    }
    async search(filter: IPunishmentSearchProps): Promise<IPunishmentModel[]>{
        const punishments: IPunishmentModel[] = []
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
        return punishments
    }
    async pardonAllOfPlayer(player_uuid: string): Promise<void>{
        const punishments = await this.search({
            player_uuid,
            deleted: false,
            is_valid: true
        })
        for(let i in punishments){
            punishments[i].deleted = true
            punishments[i].is_valid = false
            await punishments[i].save()
        }
    }
}

const punishmentRepository = new PunishmentRepository()

export default punishmentRepository