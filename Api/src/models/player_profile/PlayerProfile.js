const { Luisz576Db } = require('../../services/database')
const mongoose = require('mongoose')
const FriendsListRepository = require('../../repositories/friends/FriendsListRepository')
const BlockListRepository = require('../../repositories/player_profile/BlockListRepository')
const PunishmentRepository = require('../../repositories/punishments/PunishmentRepository')

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
    friend_invites_prefference: {
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
}, {
    methods: {
        getFriends: async function(){
            const friendsList = await FriendsListRepository.getById({
                friends_list_id: this.friends_list
            })
            return friendsList.friends
        },
        areFriends: async function(profileUUID){
            const friends = await this.getFriends()
            for(let i in friends){
                if(friends[i].player_profile == profileUUID){
                    return true
                }
            }
            return false
        },
        getBlocks: async function(){
            const blockList = await BlockListRepository.getById({
                block_list_id: this.block_list
            })
            return blockList.blocked_players
        },
        isBlockedByPlayer: async function(profileUUID){
            const blocked_players = await this.getBlocks()
            for(let i in blocked_players){
                if(blocked_players[i].player_profile == profileUUID){
                    return true
                }
            }
            return false
        },
        // TODO tirar daqui e colocar no PunishmentRepository
        getPunishments: async function(){
            return await PunishmentRepository.searsh({
                player_profile_uuid: this.uuid
            })
        }
    }
})

module.exports = Luisz576Db.model('PlayerProfile', PlayerProfileSchema)