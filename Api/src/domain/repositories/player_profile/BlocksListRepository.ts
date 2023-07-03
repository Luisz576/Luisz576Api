import { OnlyExecutePromise, ReturnOrErrorPromise } from "../../../types/either"
import { IBlockList, IBlockListCreateProps, IBlockListSearchProps, IBlockedPlayer } from "../../models/player_profile/BlocksList"

export type IBlockListOrError = ReturnOrErrorPromise<IBlockList>
export type MaybeIBlockListOrError = ReturnOrErrorPromise<IBlockList | null>
export type BlockDTO = Omit<IBlockedPlayer, 'timestamp'> & {
    block_list: IBlockList
}

export interface IBlockListRepository{
    store(data: IBlockListCreateProps): IBlockListOrError
    search(filter: IBlockListSearchProps): MaybeIBlockListOrError
    block(data: BlockDTO): OnlyExecutePromise
    unblock(data: BlockDTO): OnlyExecutePromise
}