import { IBlockList, IBlockListCreateProps } from "../../models/player_profile/BlocksList"

export type BlockDTO = {
    block_list_id: string,
    uuid_target: string
}

export interface IBlockListRepository{
    store(data: IBlockListCreateProps): Promise<IBlockList>
    getById(id: string): Promise<IBlockList | null>
    block(data: BlockDTO): Promise<void>
    unblock(data: BlockDTO): Promise<void>
}