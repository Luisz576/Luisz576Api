import { IPlayerProfile } from "../../domain/models/player_profile/PlayerProfile";
import { IPlayerProfileRepository } from "../../domain/repositories/player_profile/PlayerProfileRepository";
import { PromiseEither, left, right } from "../../types/either";

type GetPlayerProfileByUUIDRequest = {
    uuid: string
}

export class GetPlayerProfileByUUID{
    constructor(
        private playerProfileRepository: IPlayerProfileRepository
    ){}
    async execute(data: GetPlayerProfileByUUIDRequest): PromiseEither<any, IPlayerProfile>{
        try{
            const profile = await this.playerProfileRepository.searchOne({
                uuid: data.uuid
            })
            if(profile){
                return right(profile)
            }
            // TODO erro customizado
            return left("")
        }catch(err){
            return left(err)
        }
    }
}