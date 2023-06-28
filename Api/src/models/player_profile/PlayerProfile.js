const { Luisz576Db } = require('../../services/database')
const Punishment = require('../../models/punishments/punishment')
const mongoose = require('mongoose')
const FriendsList = require('../friends/FriendsList')
const BlockList = require('./BlockList')

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
        ref: 'BlockList'
    },
    // Friends
    friends_list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FriendsList'
    },
    // Flags
    punishment: {
        type: Boolean,
        default: false
    },
}, {
    methods: {
        getFriends: async function(){
            const friendsList = await FriendsList.findById(this.friends_list)
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
        addNewFriend: async function(profile){
            if(await this.areFriends(profile.uuid)){
                throw "Players are already friends"
            }

            const friendList = await FriendsList.findById(this.friends_list)
            const friendFriendList = await FriendsList.findById(profile.friends_list)

            //salve
            friendList.friends.push({
                player_profile: profile.uuid,
            })
            friendFriendList.friends.push({
                player_profile: this.uuid
            })
            await friendList.save()
            await friendFriendList.save()
        },
        removeFriend: async function(profile){
            const friendList = await FriendsList.findById(this.friends_list)
            const friendFriendList = await FriendsList.findById(profile.friends_list)

            // find
            let targetIndex = -1
            for(let i in friendList.friends){
                if(friendList.friends[i].player_profile == profile.uuid){
                    targetIndex = i
                }
            }
            let targetFriendIndex = -1
            for(let i in friendFriendList.friends){
                if(friendFriendList.friends[i].player_profile == this.uuid){
                    targetFriendIndex = i
                }
            }

            if(targetIndex != -1 && targetFriendIndex != -1){
                // remove
                friendList.friends.splice(targetIndex, 1)
                friendFriendList.friends.splice(targetFriendIndex, 1)

                // save
                await friendList.save()
                await friendFriendList.save()
                return
            }
            throw "Players aren't friends"
        },
        getBlocks: async function(){
            const blockList = await BlockList.findById(this.block_list)
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
        // TODO tirar daqui e colocar no modelo Punishments com o nome de findAllFor
        registerPunishment: function(){
            this.punishment = true
        },
        getPunishments: async function(){
            return await Punishment.find({player_profile: this._id})
        }
    }
})

module.exports = Luisz576Db.model('PlayerProfile', PlayerProfileSchema)