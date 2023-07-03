import { Document, Schema } from "mongoose"

export interface IBlockListCreateProps{
    player_profile: Schema.Types.ObjectId
}

export type IBlockListSearchProps = IBlockListCreateProps

export interface IBlockedPlayer{
    player_profile: string
    is_blocked?: boolean,
    timestamp?: Date
}
export interface IBlockList extends IBlockListCreateProps, Document{
    blocked_players: IBlockedPlayer[]
    block(playerUUID: string): boolean
    unblock(playerUUID: string): boolean
}