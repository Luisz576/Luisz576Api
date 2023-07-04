import { IPlayerProfileRepository } from "../../domain/repositories/player_profile/PlayerProfileRepository";
import { IPunishmentRepository } from "../../domain/repositories/punishment/PunishmentRepository";
import roles from "../../domain/roles";
import { PromiseEither, left, right } from "../../types/either";

type PardonAllPunishmentsOfPlayerRequest = {
    player_uuid: string,
    applicator_uuid: string
}

export class PardonAllPunishmentsOfPlayer{
    constructor(
        private punishmentRepository: IPunishmentRepository,
        private playerProfileRepository: IPlayerProfileRepository
    ){}
    async execute(data: PardonAllPunishmentsOfPlayerRequest): PromiseEither<any, null>{
        try{
            const player_profile = await this.playerProfileRepository.searchOne({
                uuid: data.player_uuid
            })
    
            if(!player_profile){
                // TODO sistema de erro customizado
                return left(new Error(""))
            }

            if(!player_profile.punishment){
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

            await this.punishmentRepository.pardonAllOfPlayer(data.player_uuid)
            return right(null)
        }catch(err){
            return left(err)
        }
    }
}