import { IBlockListRepository } from "../../domain/repositories/player_profile/BlocksListRepository";
import { IPlayerProfileRepository } from "../../domain/repositories/player_profile/PlayerProfileRepository";
import { PromiseEither, left, right } from "../../types/either";

type UnblockPlayerProfileRequest = {
    uuid: string,
    uuid_to_unblock: string
}

export default class UnblockPlayerProfile{
    constructor(
        private blockListRepository: IBlockListRepository,
        private playerProfileRepository: IPlayerProfileRepository
    ){}
    async execute(data: UnblockPlayerProfileRequest): PromiseEither<any, null>{
        try{
            const profile = await this.playerProfileRepository.searchOne({
                uuid: data.uuid
            })
            if(!profile){
                // TODO
                return left("a")
            }
            if(!(await profile.isBlockedByPlayer(data.uuid_to_unblock))){
                // TODO
                return left("b")
            }
            await this.blockListRepository.unblock({
                block_list_id: profile.block_list,
                uuid_target: data.uuid_to_unblock
            })
            return right(null)
        }catch(err){
            return left(err)
        }
    }
}