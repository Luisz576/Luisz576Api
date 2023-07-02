import { Luisz576Db } from "../../services/database"
import mongoose from "mongoose"
import { isBanPunishment } from "../../domain/punishmentType"
import PunishmentRepository from "../../repositories/punishment/PunishmentRepository"

export interface IPlayerProfileCreateProps{
    uuid: string,
    username: string
}

export type IPlayerProfileSearchProps = Partial<IPlayerProfileCreateProps>

// TODO testar comportamento se fosse class
export interface IPlayerProfile{
    uuid: string
    username: string
    language: number
    skin: string
    account_actived: boolean
    friend_invites_preference: boolean
    network_xp: number
    cash: number
    coins: number
    created_at: Date
    last_login: Date
    role: number
    email: string
    discord: string
    twitch: string
    youtube: string
    products_list: mongoose.Schema.Types.ObjectId
    block_list: mongoose.Schema.Types.ObjectId
    friends_list: mongoose.Schema.Types.ObjectId
    punishment: boolean
}

const PlayerProfileSchema = new mongoose.Schema<IPlayerProfile>({
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

PlayerProfileSchema.methods.getFriends = async function(){
    const friendsList = await FriendsListRepository.getById({
        friends_list_id: this.friends_list
    })
    return friendsList.friends
}

PlayerProfileSchema.methods.areFriends = async function(profileUUID: string){
    const friends = await this.getFriends()
    for(let i in friends){
        if(friends[i].player_profile == profileUUID){
            return true
        }
    }
    return false
}

PlayerProfileSchema.methods.getBlocks = async function(){
    const blockList = await BlockListRepository.getById({
        block_list_id: this.block_list
    })
    return blockList.blocked_players
}

PlayerProfileSchema.methods.isBlockedByPlayer = async function(profileUUID: string){
    const blocked_players = await this.getBlocks()
    for(let i in blocked_players){
        if(blocked_players[i].player_profile == profileUUID){
            return true
        }
    }
    return false
}

PlayerProfileSchema.methods.getPunishments = async function(){
    return await PunishmentRepository.search({
        player_profile_uuid: this.uuid
    })
}

PlayerProfileSchema.methods.getValidPunishments = async function(){
    return await PunishmentRepository.search({
        player_profile_uuid: this.uuid,
        deleted: false,
        is_valid: true
    })
}

PlayerProfileSchema.methods.isBanned = async function(){
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

export default Luisz576Db.model('PlayerProfile', PlayerProfileSchema)