import { IPlayerProfileRepository } from "../../domain/repositories/player_profile/PlayerProfileRepository"
import { PromiseEither, left, right } from "../../types/either"

type MakePlayerProfileSessionRequest = {
    uuid: string
}

export class MakePlayerProfileSession{
    constructor(
        private playerProfileRepository: IPlayerProfileRepository
    ){}
    async execute(data: MakePlayerProfileSessionRequest): PromiseEither<any, null>{
        try{
            await this.playerProfileRepository.session(data.uuid)
            return right(null)
        }catch(err){
            return left(err)
        }
    }
}