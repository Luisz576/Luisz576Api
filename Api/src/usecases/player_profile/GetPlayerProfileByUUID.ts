import { ErrorType } from "../../domain/errors/error_type";
import { ILogError, logErrorFactory } from "../../domain/errors/errors";
import { IPlayerProfile } from "../../domain/models/player_profile/PlayerProfile";
import { IPlayerProfileRepository } from "../../domain/repositories/player_profile/PlayerProfileRepository";
import { Either, left, right } from "../../types/either";

type GetPlayerProfileByUUIDRequest = {
    uuid: string
}

export default class GetPlayerProfileByUUID{
    constructor(
        private playerProfileRepository: IPlayerProfileRepository
    ){}
    async execute(data: GetPlayerProfileByUUIDRequest): Promise<Either<ILogError, IPlayerProfile>>{
        try{
            const profile = await this.playerProfileRepository.searchOne({
                uuid: data.uuid
            })
            if(profile){
                return right(profile)
            }
            return left(logErrorFactory(ErrorType.profile_not_founded))
        }catch(err){
            return left(logErrorFactory(ErrorType.generic, err))
        }
    }
}