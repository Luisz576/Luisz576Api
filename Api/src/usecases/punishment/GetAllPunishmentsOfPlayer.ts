import { IPunishment } from "../../domain/models/punishments/Punishment"
import { IPlayerProfileRepository } from "../../domain/repositories/player_profile/PlayerProfileRepository"
import { IPunishmentRepository } from "../../domain/repositories/punishment/PunishmentRepository"
import { PromiseEither, left, right } from "../../types/either"

type GetAllPunishmentsOfPlayerRequest = {
    uuid: string
}

export class GetAllPunishmentsOfPlayer{
    constructor(
        private punishmentsRepository: IPunishmentRepository,
        private playerProfileRepository: IPlayerProfileRepository
    ){}
    async execute(data: GetAllPunishmentsOfPlayerRequest): PromiseEither<any, IPunishment[]>{
        try{
            const player_profile = await this.playerProfileRepository.searchOne({
                uuid: data.uuid
            })
    
            if(!player_profile){
                // TODO sistema de erro customizado
                return left(new Error(""))
            }

            if(!player_profile.punishment){
                // TODO sistema de erro customizado
                return left(new Error(""))
            }

            const punishments = await this.punishmentsRepository.search({
                player_uuid: data.uuid
            });
            return right(punishments)
        }catch(err){
            return left(err)
        }
    }
}