import { IBlockList, IBlockListCreateProps, IBlockListSearchProps, IBlockedPlayer } from "../../models/player_profile/BlocksList"

export type BlockDTO = Omit<IBlockedPlayer, 'timestamp'> & {
    block_list: IBlockList
}

export interface IBlockListRepository{
    store(data: IBlockListCreateProps): Promise<IBlockList>
    search(filter: IBlockListSearchProps): Promise<IBlockList | null>
    block(data: BlockDTO): Promise<void>
    unblock(data: BlockDTO): Promise<void>
}