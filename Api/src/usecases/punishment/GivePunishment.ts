import { ErrorType } from "../../domain/errors/error_type";
import { ILogError, logErrorFactory } from "../../domain/errors/errors";
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
    async execute(data: IPunishmentCreateProps): PromiseEither<ILogError, IPunishment>{
        try{
            const player_profile = await this.playerProfileRepository.searchOne({
                uuid: data.player_uuid
            })
    
            if(!player_profile){
                return left(logErrorFactory(ErrorType.profile_not_founded))
            }
    
            const applicator_profile = await this.playerProfileRepository.searchOne({
                uuid: data.applicator_uuid
            })
    
            if(!applicator_profile){
                return left(logErrorFactory(ErrorType.target_profile_not_found))
            }
    
            if(!roles.isAdmin(applicator_profile.role)){
                return left(logErrorFactory(ErrorType.applicator_isnt_an_adm))
            }
    
            await this.playerProfileRepository.setHasPunishment(player_profile.uuid)
            const punishment = await this.punishmentRepository.store(data)
            return right(punishment)
        }catch(err){
            return left(logErrorFactory(ErrorType.generic, err))
        }
    }
}