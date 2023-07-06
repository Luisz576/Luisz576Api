import { Luisz576Db } from "../../services/database"
import { Document, Schema } from "mongoose"
import { isBanPunishment } from "../../domain/punishmentType"
import PunishmentRepository from "../../repositories/punishment/PunishmentRepository"
import FriendsListRepository from "../../repositories/friends/FriendsListRepository"
import BlockListRepository from "../../repositories/player_profile/BlockListRepository"
import { IPlayerProfile } from "../../domain/models/player_profile/PlayerProfile"
import { IPunishment } from "../../domain/models/punishments/Punishment"
import { IFriend } from "../../domain/models/friends/FriendsList"
import { IBlockedPlayer } from "../../domain/models/player_profile/BlocksList"

const PlayerProfileSchema = new Schema<IPlayerProfile>({
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
        type: String,
        required: true,
        unique: true
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
        type: String,
        required: true,
        unique: true
    },
    // Friends
    friends_list: {
        type: String,
        required: true,
        unique: true
    },
    // Flags
    punishment: {
        type: Boolean,
        default: false
    },
})

PlayerProfileSchema.methods.getFriends = async function(): Promise<IFriend[]> {
    const friends_list = await FriendsListRepository.getById(this.friends_list)
    if(!friends_list){
        throw new Error(`Can't find FriendList '${this.friends_list}'`)
    }
    return friends_list.friends
}

PlayerProfileSchema.methods.areFriends = async function(profileUUID: string): Promise<boolean>{
    const friends = await this.getFriends()
    for(let f of friends){
        if(f.player_uuid == profileUUID){
            return true
        }
    }
    return false
}

PlayerProfileSchema.methods.getBlocks = async function(): Promise<IBlockedPlayer[]>{
    const block_list = await BlockListRepository.getById(this.block_list)
    if(!block_list){
        throw new Error(`Can't find BlockList '${this.block_list}'`)
    }
    return block_list.blocked_players
}

PlayerProfileSchema.methods.isBlockedByPlayer = async function(profileUUID: string): Promise<boolean>{
    const blocked_players = await this.getBlocks()
    for(let i in blocked_players){
        if(blocked_players[i].player_uuid == profileUUID){
            if(blocked_players[i].is_blocked){
                return true
            }
        }
    }
    return false
}

PlayerProfileSchema.methods.getPunishments = async function(): Promise<IPunishment[]>{
    if(this.punishment){
        return await PunishmentRepository.search({
            player_uuid: this.uuid
        })
    }
    return []
}

PlayerProfileSchema.methods.getValidPunishments = async function(): Promise<IPunishment[]>{
    if(this.punishment){
        return await PunishmentRepository.search({
            player_uuid: this.uuid,
            deleted: false,
            is_valid: true
        })
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

export type IPlayerProfileModel = IPlayerProfile & Document
export default Luisz576Db.model<IPlayerProfileModel>('PlayerProfile', PlayerProfileSchema)