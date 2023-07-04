import { IBlockListCreateProps } from "../../domain/models/player_profile/BlocksList"
import BlockList, { IBlockListModel } from "../../schemas/player_profile/BlockList"
import { BlockDTO, IBlockListRepository } from "../../domain/repositories/player_profile/BlocksListRepository"

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
        const block_list = await this.getById(data.block_list_id)
        if(!block_list){
            throw new Error("Can't find BlockList")
        }
        block_list.block(data.uuid_target)
        block_list.save()
    }
    async unblock(data: BlockDTO): Promise<void>{
        const block_list = await this.getById(data.block_list_id)
        if(!block_list){
            throw new Error("Can't find BlockList")
        }
        block_list.unblock(data.uuid_target)
        block_list.save()
    }
}

const blockListRepository = new BlockListRepository()

export default blockListRepository