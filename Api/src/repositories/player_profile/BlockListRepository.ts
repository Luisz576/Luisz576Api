import { IBlockListCreateProps, IBlockListSearchProps, IBlockedPlayer } from "../../domain/models/player_profile/BlocksList"
import BlockList, { IBlockListModel } from "../../schemas/player_profile/BlockList"
import { IBlockListRepository } from "../../domain/repositories/player_profile/BlocksListRepository"

type BlockDTO = Omit<IBlockedPlayer, 'timestamp'> & {
    block_list: IBlockListModel
}

class BlockListRepository implements IBlockListRepository {
    async store(data: IBlockListCreateProps): Promise<IBlockListModel>{
        const block_list = await BlockList.create(data)
        if(block_list){
            return block_list
        }
        throw new Error("Can't create Block List")
    }
    async getById(id: string): Promise<IBlockListModel | null>{
        return await BlockList.findById(id)
    }
    async block(data: BlockDTO): Promise<void>{
        data.block_list.block(data.player_uuid)
        data.block_list.save()
    }
    async unblock(data: BlockDTO): Promise<void>{
        data.block_list.unblock(data.player_uuid)
        data.block_list.save()
    }
}

const blockListRepository = new BlockListRepository()

export default blockListRepository