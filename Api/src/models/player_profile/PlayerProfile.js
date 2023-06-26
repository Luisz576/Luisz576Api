const { PlayerProfileDb } = require('../../services/database')
const mongoose = require('mongoose')

const PlayerProfileSchema = new mongoose.Schema({
    uuid: String,
    username: String,
    language: {
        type: Number,
        default: 0
    },
    skin: {
        type: String,
        default: ""
    },
    network_xp: {
        type: Number,
        default: 0
    },
    cash: {
        type: Number,
        default: 0
    },
    coins: {
        type: Number,
        default: 1000
    },
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
    account_actived: {
        type: Boolean,
        default: true
    },
    products_list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductsList'
    },
    friends_list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FriendsList'
    },
    block_list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlockList'
    },
    punishiment: {
        type: Boolean,
        default: false
    },
})

module.exports = PlayerProfileDb.model('PlayerProfile', PlayerProfileSchema)