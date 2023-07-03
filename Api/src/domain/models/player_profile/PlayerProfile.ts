import { IFriend } from "../friends/FriendsList"
import { IPunishment } from "../punishments/Punishment"
import { IBlockedPlayer } from "./BlocksList"

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

// TODO desacoplar ID?
export interface IPlayerProfile<ID> extends Required<IPlayerProfileSearchProps>{
    created_at: Date
    last_login: Date
    products_list: ID
    block_list: ID
    friends_list: ID
    getFriends(): Promise<IFriend[]>
    areFriends(profileUUID: string): Promise<boolean>
    getBlocks(): Promise<IBlockedPlayer[]>
    isBlockedByPlayer(profileUUID: string): Promise<boolean>
    getPunishments(): Promise<IPunishment[]>
    getValidPunishments(): Promise<IPunishment[]>
    isBanned(): Promise<boolean>
}