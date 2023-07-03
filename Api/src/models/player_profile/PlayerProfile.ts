import { Luisz576Db } from "../../services/database"
import { Schema, Document } from "mongoose"
import { isBanPunishment } from "../../domain/punishmentType"
import PunishmentRepository from "../../repositories/punishment/PunishmentRepository"
import FriendsListRepository from "../../repositories/friends/FriendsListRepository"
import { IFriend } from "../friends/FriendsList"
import { IPunishment } from "../punishments/Punishment"
import { IBlockedPlayer } from "./BlockList"
import BlockListRepository from "../../repositories/player_profile/BlockListRepository"

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

const PlayerProfileSchema = new Schema({
    // DATA
    uuid: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    // CONFIGS
    language: {
        type: Number,
        default: 0
    },
    skin: {
        type: String,
        default: ""
    },
    account_actived: {
        type: Boolean,
        default: true
    },
    friend_invites_preference: {
        type: Boolean,
        default: true
    },
    // XP
    network_xp: {
        type: Number,
        default: 0,
        min: 0
    },
    // SHOP
    cash: {
        type: Number,
        default: 0,
        min: 0
    },
    coins: {
        type: Number,
        default: 1000,
        min: 0
    },
    products_list: {
        type: Schema.Types.ObjectId,
        ref: 'ProductsList'
    },
    // INFO
    created_at: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    last_login: {
        type: Date,
        default: Date.now
    },
    role: {
        type: Number,
        default: 0
    },
    // SOCIAL
    email: {
        type: String,
        default: '',
    },
    discord: {
        type: String,
        default: ''
    },
    twitch: {
        type: String,
        default: ''
    },
    youtube: {
        type: String,
        default: ''
    },
    // Blocks
    block_list: {
        type: Schema.Types.ObjectId,
        ref: 'BlockList',
    },
    // Friends
    friends_list: {
        type: Schema.Types.ObjectId,
        ref: 'FriendsList',
    },
    // Flags
    punishment: {
        type: Boolean,
        default: false
    },
})

PlayerProfileSchema.methods.getFriends = async function(): Promise<IFriend[]> {
    const friends_list_response = await FriendsListRepository.getById(this.friends_list)
    if(friends_list_response.isRight()){
        if(friends_list_response.value){
            return friends_list_response.value.friends
        }
        throw new Error(`Can't find FriendList ${this.friends_list}`)
    }
    throw new Error(friends_list_response.value)
}

PlayerProfileSchema.methods.areFriends = async function(profileUUID: string): Promise<boolean>{
    const friends = await this.getFriends()
    for(let i in friends){
        if(friends[i].player_profile == profileUUID){
            return true
        }
    }
    return false
}

PlayerProfileSchema.methods.getBlocks = async function(): Promise<IBlockedPlayer[]>{
    const block_list_response = await BlockListRepository.getById(this.block_list)
    if(block_list_response.isRight()){
        if(block_list_response.value){
            return block_list_response.value.blocked_players
        }
        throw new Error(`Can't find BlockList (PlayerProfile '${this._id}')`)
    }
    throw new Error(block_list_response.value)
}

PlayerProfileSchema.methods.isBlockedByPlayer = async function(profileUUID: string): Promise<boolean>{
    const blocked_players = await this.getBlocks()
    for(let i in blocked_players){
        if(blocked_players[i].player_profile == profileUUID){
            if(blocked_players[i].is_blocked){
                return true
            }
        }
    }
    return false
}

PlayerProfileSchema.methods.getPunishments = async function(): Promise<IPunishment[]>{
    if(this.punishment){
        const punishments_response = await PunishmentRepository.search({
            player_uuid: this.uuid
        })
        if(punishments_response.isRight()){
            return punishments_response.value
        }
        throw new Error(punishments_response.value)
    }
    return []
}

PlayerProfileSchema.methods.getValidPunishments = async function(): Promise<IPunishment[]>{
    if(this.punishment){
        const punishments_response = await PunishmentRepository.search({
            player_uuid: this.uuid,
            deleted: false,
            is_valid: true
        })
        if(punishments_response.isRight()){
            return punishments_response.value
        }
        throw new Error('punishments_response.value')
    }
    return []
}

PlayerProfileSchema.methods.isBanned = async function(): Promise<boolean>{
    if(this.punishment){
        const punishments = await this.getValidPunishments()
        for(let i in punishments){
            if(isBanPunishment(punishments[i])){
                return true
            }
        }
    }
    return false
}

export default Luisz576Db.model<IPlayerProfile>('PlayerProfile', PlayerProfileSchema)