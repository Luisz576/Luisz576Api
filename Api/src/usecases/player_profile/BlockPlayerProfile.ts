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
    async execute(data: BlockPlayerProfileRequest): PromiseEither<any, null>{
        try{
            const profile = await this.playerProfileRepository.searchOne({
                uuid: data.uuid
            })
            if(!profile){
                // TODO
                return left("")
            }
            await this.blockListRepository.block({
                block_list_id: profile.block_list,
                uuid_target: data.uuid_to_block
            })
            return right(null)
        }catch(err){
            return left(err)
        }
    }
}