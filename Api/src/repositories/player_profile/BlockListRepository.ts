import BlockList, { IBlockList, IBlockListCreateProps, IBlockListSearchProps } from "../../models/player_profile/BlockList"
import { ReturnOrErrorPromise, left, right } from "../../types/either"

type IBlockListOrError = ReturnOrErrorPromise<IBlockList>
type MaybeIBlockListOrError = ReturnOrErrorPromise<IBlockList | undefined>

export default {
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
    },
    async getById(block_list_id: string): MaybeIBlockListOrError{
        try{
            return right(await BlockList.findById(block_list_id))
        }catch(err){
            return left(err)
        }
    },
    async search(filter: IBlockListSearchProps): MaybeIBlockListOrError{
        try{
            return right(await BlockList.findOne(filter))
        }catch(err){
            return left(err)
        }
    },
    async block(){
        // TODO
    },
    async unblock(){
        // TODO
    }
}