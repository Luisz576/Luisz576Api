import { ErrorType } from "../../domain/errors/error_type";
import { ILogError, logErrorFactory } from "../../domain/errors/errors";
import { IPlayerProfileRepository } from "../../domain/repositories/player_profile/PlayerProfileRepository";
import { IPunishmentRepository } from "../../domain/repositories/punishment/PunishmentRepository";
import roles from "../../domain/roles";
import { Either, left, right } from "../../types/either";

type PardonAllPunishmentsOfPlayerRequest = {
    player_uuid: string,
    applicator_uuid: string
}

export default class PardonAllPunishmentsOfPlayer{
    constructor(
        private punishmentRepository: IPunishmentRepository,
        private playerProfileRepository: IPlayerProfileRepository
    ){}
    async execute(data: PardonAllPunishmentsOfPlayerRequest): Promise<Either<ILogError, null>>{
        try{
            const player_profile = await this.playerProfileRepository.searchOne({
                uuid: data.player_uuid
            })
    
            if(!player_profile){
                return left(logErrorFactory(ErrorType.profile_not_founded))
            }

            if(!player_profile.punishment){
                return right(null)
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

            await this.punishmentRepository.pardonAllOfPlayer(data.player_uuid)
            return right(null)
        }catch(err){
            return left(logErrorFactory(ErrorType.generic, err))
        }
    }
}