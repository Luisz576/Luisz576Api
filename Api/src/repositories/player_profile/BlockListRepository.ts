import { OnlyExecutePromise, ReturnOrErrorPromise, left, right } from "../../types/either"
import { IBlockListCreateProps, IBlockListSearchProps, IBlockedPlayer } from "../../domain/models/player_profile/BlocksList"
import BlockList, { IBlockListModel } from "../../schemas/player_profile/BlockList"
import { IBlockListRepository } from "../../domain/repositories/player_profile/BlocksListRepository"

type IBlockListOrError = ReturnOrErrorPromise<IBlockListModel>
type MaybeIBlockListOrError = ReturnOrErrorPromise<IBlockListModel | null>
type BlockDTO = Omit<IBlockedPlayer, 'timestamp'> & {
    block_list: IBlockListModel
}

class BlockListRepository implements IBlockListRepository {
    async store(data: IBlockListCreateProps): IBlockListOrError{
        try{
            const block_list = await BlockList.create(data)
            if(block_list){
                return right(block_list)
            }
            return left("Can't create Block List")
        }catch(err){
            return left(err)
        }
    }
    async search(filter: IBlockListSearchProps): MaybeIBlockListOrError{
        try{
            return right(await BlockList.findOne(filter))
        }catch(err){
            return left(err)
        }
    }
    async block(data: BlockDTO): OnlyExecutePromise{
        try{
            data.block_list.block(data.player_uuid)
            data.block_list.save()
            return right(null)
        }catch(err){
            return left(err)
        }
    }
    async unblock(data: BlockDTO): OnlyExecutePromise{
        try{
            data.block_list.unblock(data.player_uuid)
            data.block_list.save()
            return right(null)
        }catch(err){
            return left(err)
        }
    }
}

const blockListRepository = new BlockListRepository()

export default blockListRepository