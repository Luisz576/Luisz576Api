import IEntity from "../IEntity"

export interface IBlockListCreateProps{
    player_uuid: string
}

export type IBlockListSearchProps = IBlockListCreateProps

export interface IBlockedPlayer{
    player_uuid: string
    is_blocked?: boolean,
    timestamp?: Date
}
export interface IBlockList extends IEntity, IBlockListCreateProps{
    blocked_players: IBlockedPlayer[]
    block(playerUUID: string): boolean
    unblock(playerUUID: string): boolean
}