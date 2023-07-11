import { ErrorType } from "../../domain/errors/error_type";
import { ILogError, logErrorFactory } from "../../domain/errors/errors";
import { IBlockListRepository } from "../../domain/repositories/player_profile/BlocksListRepository";
import { IPlayerProfileRepository } from "../../domain/repositories/player_profile/PlayerProfileRepository";
import { Either, left, right } from "../../types/either";

type UnblockPlayerProfileRequest = {
    uuid: string,
    uuid_to_unblock: string
}

export default class UnblockPlayerProfile{
    constructor(
        private blockListRepository: IBlockListRepository,
        private playerProfileRepository: IPlayerProfileRepository
    ){}
    async execute(data: UnblockPlayerProfileRequest): Promise<Either<ILogError, null>>{
        try{
            const profile = await this.playerProfileRepository.searchOne({
                uuid: data.uuid
            })
            if(!profile){
                return left(logErrorFactory(ErrorType.profile_not_founded))
            }
            if(!(await profile.isBlockedByPlayer(data.uuid_to_unblock))){
                return left(logErrorFactory(ErrorType.player_isnt_blocked))
            }
            await this.blockListRepository.unblock({
                block_list_id: profile.block_list,
                uuid_target: data.uuid_to_unblock
            })
            return right(null)
        }catch(err){
            return left(logErrorFactory(ErrorType.generic, err))
        }
    }
}