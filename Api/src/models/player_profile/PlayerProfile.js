const { PlayerProfileDb } = require('../../services/database')
const mongoose = require('mongoose')
const FriendsList = require('../friends/FriendsList')
const Friendship = require('../friends/Friendship')

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
            if(!friendList){
                // TODO tenta criar uma lista? ou melhor nn?
                return false
            }
            const friendship = await Friendship.findOne({
                player_profile: this._id,
                friend_profile: friendProfileId
            })
            if(friendship != null){
                return true
            }
            return false
        },
        acceptNewFriend: async function(friendProfile, friendInviteId){
            if(await this.areFriends(friendProfile._id)){
                return false;
            }
            //ja sabe que existe pois chamou a funcao areFriends()
            const friendList = await FriendsList.findById(this.friends_list)
            const friendFriendList = await FriendsList.findById(friendProfile.friends_list)

            // cria relacao de amizade
            const friendshipProfile = await Friendship.create({
                player_profile: this._id,
                friend_profile: friendProfile._id,
                friend_invite: friendInviteId
            })
            const friendshipFriendProfile = await Friendship.create({
                player_profile: friendProfile._id,
                friend_profile: this._id,
                friend_invite: friendInviteId
            })

            if(friendshipProfile && friendshipFriendProfile){
                //salve
                friendList.friends.push(friendshipProfile._id)
                friendFriendList.friends.push(friendshipFriendProfile._id)
                await friendList.save()
                await friendFriendList.save()

                return true
            }
            return false
        }
    }
})

module.exports = PlayerProfileDb.model('PlayerProfile', PlayerProfileSchema)