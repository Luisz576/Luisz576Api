import { ErrorType } from "../../domain/errors/error_type"
import { ILogError, logErrorFactory } from "../../domain/errors/errors"
import { IPlayerProfileRepository } from "../../domain/repositories/player_profile/PlayerProfileRepository"
import { Either, left, right } from "../../types/either"

type MakePlayerProfileSessionRequest = {
    uuid: string
}

export default class MakePlayerProfileSession{
    constructor(
        private playerProfileRepository: IPlayerProfileRepository
    ){}
    async execute(data: MakePlayerProfileSessionRequest): Promise<Either<ILogError, null>>{
        try{
            await this.playerProfileRepository.session(data.uuid)
            return right(null)
        }catch(err){
            return left(logErrorFactory(ErrorType.generic, err))
        }
    }
}