import { Document, Schema } from "mongoose"
import { IFriend } from "../friends/FriendsList"
import { IBlockedPlayer } from "../../../schemas/player_profile/BlockList"
import { IPunishment } from "../punishments/Punishment"

export interface IPlayerProfileCreateProps{
    uuid: string,
    username: string
}

export interface IPlayerProfileConfigs{
    skin: string
    language: number
    friend_invites_preference: boolean
    email: string
    discord: string
    youtube: string
    twitch: string
}

export type IPlayerProfileSearchProps = Partial<IPlayerProfileCreateProps> & Partial<IPlayerProfileConfigs> & {
    account_actived?: boolean
    network_xp?: number
    cash?: number
    coins?: number
    role?: number
    punishment?: boolean
}

export interface IPlayerProfile extends Required<IPlayerProfileSearchProps>, Document{
    created_at: Date
    last_login: Date
    products_list: Schema.Types.ObjectId
    block_list: Schema.Types.ObjectId
    friends_list: Schema.Types.ObjectId
    getFriends(): Promise<IFriend[]>
    areFriends(profileUUID: string): Promise<boolean>
    getBlocks(): Promise<IBlockedPlayer[]>
    isBlockedByPlayer(profileUUID: string): Promise<boolean>
    getPunishments(): Promise<IPunishment[]>
    getValidPunishments(): Promise<IPunishment[]>
    isBanned(): Promise<boolean>
}