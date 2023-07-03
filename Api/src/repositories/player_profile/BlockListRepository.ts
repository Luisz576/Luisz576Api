import mongoose from "mongoose"
import BlockList, { IBlockList, IBlockListCreateProps, IBlockListSearchProps, IBlockedPlayer } from "../../models/player_profile/BlockList"
import { OnlyExecutePromise, ReturnOrErrorPromise, left, right } from "../../types/either"

type IBlockListOrError = ReturnOrErrorPromise<IBlockList>
type MaybeIBlockListOrError = ReturnOrErrorPromise<IBlockList | null>
type BlockDTO = Omit<IBlockedPlayer, 'timestamp'> & {
    block_list_id: mongoose.Schema.Types.ObjectId
}

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
    async getById(block_list_id: mongoose.Schema.Types.ObjectId): MaybeIBlockListOrError{
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
    async block(data: BlockDTO): OnlyExecutePromise{
        try{
            const block_list_response = await this.getById(data.block_list_id)
            if(block_list_response.isRight()){
                if(block_list_response.value){
                    block_list_response.value.block(data.player_profile)
                    block_list_response.value.save()
                    return right(null)
                }
                return left(`Can't get BlockList '${data.block_list_id}'`)
            }
            return left(block_list_response.value)
        }catch(err){
            return left(err)
        }
    },
    async unblock(data: BlockDTO): OnlyExecutePromise{
        try{
            const block_list_response = await this.getById(data.block_list_id)
            if(block_list_response.isRight()){
                if(block_list_response.value){
                    block_list_response.value.unblock(data.player_profile)
                    block_list_response.value.save()
                    return right(null)
                }
                return left(`Can't get BlockList '${data.block_list_id}'`)
            }
            return left(block_list_response.value)
        }catch(err){
            return left(err)
        }
    }
}