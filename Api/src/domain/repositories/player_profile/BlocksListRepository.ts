import { IBlockList, IBlockListCreateProps, IBlockedPlayer } from "../../models/player_profile/BlocksList"

export type BlockDTO = Omit<IBlockedPlayer, 'timestamp'> & {
    block_list: IBlockList
}

export interface IBlockListRepository{
    store(data: IBlockListCreateProps): Promise<IBlockList>
    getById(id: string): Promise<IBlockList | null>
    block(data: BlockDTO): Promise<void>
    unblock(data: BlockDTO): Promise<void>
}