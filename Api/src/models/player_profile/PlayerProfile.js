const { Luisz576Db } = require('../../services/database')
const Punishment = require('../../models/punishments/punishment')
const mongoose = require('mongoose')
const FriendsList = require('../friends/FriendsList')

const PlayerProfileSchema = new mongoose.Schema({
    // DATA
    uuid: {
        type: String,
        unique: true,
        require: true
    },
    username: {
        type: String,
        unique: true,
        require: true
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
        type: Number,
        default: 0
    },
    // XP
    network_xp: {
        type: Number,
        default: 0
    },
    // SHOP
    cash: {
        type: Number,
        default: 0
    },
    coins: {
        type: Number,
        default: 1000
    },
    products_list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductsList'
    },
    // INFO
    created: {
        type: Date,
        default: Date.now
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
            return (await FriendsList.findById(this.friends_list)).friends
        },
        areFriends: async function(friendProfileId){
            const friends = await this.getFriends()
            for(let i in friends){
                if(friends[i].player_profile.toString() == friendProfileId.toString()){
                    return true
                }
            }
            return false
        },
        acceptNewFriend: async function(friendProfile){
            if(await this.areFriends(friendProfile._id)){
                return false;
            }

            const friendList = await FriendsList.findById(this.friends_list)
            const friendFriendList = await FriendsList.findById(friendProfile.friends_list)

            //salve
            friendList.friends.push({
                player_profile: friendProfile._id,
            })
            friendFriendList.friends.push({
                player_profile: this._id
            })
            await friendList.save()
            await friendFriendList.save()

            return true
        },
        removeFriend: async function(friendProfile){
            if(await this.areFriends(friendProfile._id)){
                const friendList = await FriendsList.findById(this.friends_list)
                const friendFriendList = await FriendsList.findById(friendProfile.friends_list)

                // find
                let targetIndex = -1
                for(let i in friendList.friends){
                    if(friendList.friends[i].player_profile.toString() == friendProfile._id.toString()){
                        targetIndex = i
                    }
                }
                let targetFriendIndex = -1
                for(let i in friendFriendList.friends){
                    if(friendFriendList.friends[i].player_profile.toString() == this._id.toString()){
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
                    return true
                }
            }
            return false
        },
        async getPunishments(){
            return await Punishment.find({player_profile: this._id})
        }
    }
})

module.exports = Luisz576Db.model('PlayerProfile', PlayerProfileSchema)