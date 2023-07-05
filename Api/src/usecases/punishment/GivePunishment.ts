import { IPunishment, IPunishmentCreateProps } from "../../domain/models/punishments/Punishment";
import { IPlayerProfileRepository } from "../../domain/repositories/player_profile/PlayerProfileRepository";
import { IPunishmentRepository } from "../../domain/repositories/punishment/PunishmentRepository";
import roles from "../../domain/roles";
import { PromiseEither, left, right } from "../../types/either";

export default class GivePunishment{
    constructor(
        private punishmentRepository: IPunishmentRepository,
        private playerProfileRepository: IPlayerProfileRepository
    ){}
    async execute(data: IPunishmentCreateProps): PromiseEither<any, IPunishment>{
        try{
            const player_profile = await this.playerProfileRepository.searchOne({
                uuid: data.player_uuid
            })
    
            if(!player_profile){
                // TODO sistema de erro customizado
                return left(new Error(""))
            }
    
            const applicator_profile = await this.playerProfileRepository.searchOne({
                uuid: data.applicator_uuid
            })
    
            if(!applicator_profile){
                // TODO sistema de erro customizado
                return left(new Error(""))
            }
    
            if(!roles.isAdmin(applicator_profile.role)){
                // TODO sistema de erro customizado
                return left(new Error(""))
            }
    
            await this.playerProfileRepository.setHasPunishment(player_profile.uuid)
            const punishment = await this.punishmentRepository.store(data)
            return right(punishment)
        }catch(err){
            return left(err)
        }
    }
}