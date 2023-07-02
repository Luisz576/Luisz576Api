import { Luisz576Db } from "../../services/database"
import mongoose from "mongoose"
import { isBanPunishment } from "../../domain/punishmentType"
import PunishmentRepository from "../../repositories/punishment/PunishmentRepository"
import FriendsListRepository from "../../repositories/friends/FriendsListRepository"
import { ReturnOrErrorPromise, left, right } from "../../types/either"
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
    friend_invites_prefference: boolean
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

export interface IPlayerProfile extends Required<IPlayerProfileSearchProps>, mongoose.Document{
    created_at: Date
    last_login: Date
    products_list: mongoose.Schema.Types.ObjectId
    block_list: mongoose.Schema.Types.ObjectId
    friends_list: mongoose.Schema.Types.ObjectId
    getFriends(): ReturnOrErrorPromise<IFriend[]>
    areFriend(): ReturnOrErrorPromise<boolean>
    getBlocks(): ReturnOrErrorPromise<IBlockedPlayer[]>
    isBlockedByPlayer(): ReturnOrErrorPromise<boolean>
    getPunishments(): ReturnOrErrorPromise<IPunishment[]>
    getValidPunishments(): ReturnOrErrorPromise<IPunishment[]>
    isBanned(): ReturnOrErrorPromise<boolean>
}

const PlayerProfileSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlockList',
    },
    // Friends
    friends_list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FriendsList',
    },
    // Flags
    punishment: {
        type: Boolean,
        default: false
    },
})

PlayerProfileSchema.methods.getFriends = async function(): ReturnOrErrorPromise<IFriend[]> {
    const friends_list_response = await FriendsListRepository.getById(this.friends_list)
    if(friends_list_response.isRight()){
        return right(friends_list_response.value.friends)
    }
    return left(friends_list_response.value)
}

PlayerProfileSchema.methods.areFriends = async function(profileUUID: string): ReturnOrErrorPromise<boolean>{
    const friends_response = await this.getFriends()
    if(friends_response.isLeft()){
        return left(friends_response.value)
    }
    const friends = friends_response.value
    for(let i in friends){
        if(friends[i].player_profile == profileUUID){
            return right(true)
        }
    }
    return right(false)
}

PlayerProfileSchema.methods.getBlocks = async function(): ReturnOrErrorPromise<IBlockedPlayer[]>{
    const block_list_response = await BlockListRepository.getById(this.block_list)
    if(block_list_response.isLeft()){
        return left(block_list_response.value)
    }
    return right(block_list_response.value.blocked_players)
}

PlayerProfileSchema.methods.isBlockedByPlayer = async function(profileUUID: string): ReturnOrErrorPromise<boolean>{
    const blocked_players_response = await this.getBlocks()
    if(blocked_players_response.isLeft()){
        return left(blocked_players_response.value)
    }
    for(let i in blocked_players_response.value){
        if(blocked_players_response.value[i].player_profile == profileUUID){
            return right(true)
        }
    }
    return right(false)
}

PlayerProfileSchema.methods.getPunishments = async function(): ReturnOrErrorPromise<IPunishment[]>{
    const punishments_response = await PunishmentRepository.search({
        player_uuid: this.uuid
    })
    if(punishments_response.isLeft()){
        return left(punishments_response.value)
    }
    return right(punishments_response.value)
}

PlayerProfileSchema.methods.getValidPunishments = async function(): ReturnOrErrorPromise<IPunishment[]>{
    const punishments_response = await PunishmentRepository.search({
        player_uuid: this.uuid,
        deleted: false,
        is_valid: true
    })
    if(punishments_response.isLeft()){
        return left(punishments_response.value)
    }
    return right(punishments_response.value)
}

PlayerProfileSchema.methods.isBanned = async function(): ReturnOrErrorPromise<boolean>{
    if(this.punishment){
        const punishments = await this.getValidPunishments()
        for(let i in punishments){
            if(isBanPunishment(punishments[i])){
                return right(true)
            }
        }
    }
    return right(false)
}

export default Luisz576Db.model<IPlayerProfile>('PlayerProfile', PlayerProfileSchema)