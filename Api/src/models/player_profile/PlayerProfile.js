const { Luisz576Db } = require('../../services/database')
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
    block_list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlockList'
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
    // Friends
    friend_invites_prefference: {
        type: Number,
        default: 0
    },
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
        areFriends: async function(friendProfileId){
            const friendList = await FriendsList.findById(this.friends_list)
            return friendList.friends.includes(friendProfileId)
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
        }
    }
})

module.exports = Luisz576Db.model('PlayerProfile', PlayerProfileSchema)