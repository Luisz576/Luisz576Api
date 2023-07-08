import { ErrorType } from "../../domain/errors/error_type";
import { ILogError, logErrorFactory } from "../../domain/errors/errors";
import { IBlockListRepository } from "../../domain/repositories/player_profile/BlocksListRepository";
import { IPlayerProfileRepository } from "../../domain/repositories/player_profile/PlayerProfileRepository";
import { PromiseEither, left, right } from "../../types/either";

type BlockPlayerProfileRequest = {
    uuid: string,
    uuid_to_block: string
}

export default class BlockPlayerProfile{
    constructor(
        private blockListRepository: IBlockListRepository,
        private playerProfileRepository: IPlayerProfileRepository
    ){}
    async execute(data: BlockPlayerProfileRequest): PromiseEither<ILogError, null>{
        try{
            const profile = await this.playerProfileRepository.searchOne({
                uuid: data.uuid
            })
            if(!profile){
                return left(logErrorFactory(ErrorType.profile_not_founded))
            }
            if(await profile.isBlockedByPlayer(data.uuid_to_block)){
                return left(logErrorFactory(ErrorType.player_is_already_blocked))
            }
            await this.blockListRepository.block({
                block_list_id: profile.block_list,
                uuid_target: data.uuid_to_block
            })
            return right(null)
        }catch(err){
            return left(logErrorFactory(ErrorType.generic, err))
        }
    }
}