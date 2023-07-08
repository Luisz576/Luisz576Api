import { ErrorType } from "../../domain/errors/error_type"
import { ILogError, logErrorFactory } from "../../domain/errors/errors"
import { IPunishment } from "../../domain/models/punishments/Punishment"
import { IPlayerProfileRepository } from "../../domain/repositories/player_profile/PlayerProfileRepository"
import { IPunishmentRepository } from "../../domain/repositories/punishment/PunishmentRepository"
import { PromiseEither, left, right } from "../../types/either"

type GetAllPunishmentsOfPlayerRequest = {
    uuid: string
}

export default class GetAllPunishmentsOfPlayer{
    constructor(
        private punishmentsRepository: IPunishmentRepository,
        private playerProfileRepository: IPlayerProfileRepository
    ){}
    async execute(data: GetAllPunishmentsOfPlayerRequest): PromiseEither<ILogError, IPunishment[]>{
        try{
            const player_profile = await this.playerProfileRepository.searchOne({
                uuid: data.uuid
            })
    
            if(!player_profile){
                return left(logErrorFactory(ErrorType.profile_not_founded))
            }

            if(!player_profile.punishment){
                return right([])
            }

            const punishments = await this.punishmentsRepository.search({
                player_uuid: data.uuid
            });
            return right(punishments)
        }catch(err){
            return left(logErrorFactory(ErrorType.generic, err))
        }
    }
}