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
    punishiment: {
        type: Boolean,
        default: true
    },
    products_list: mongoose.Schema.Types.ObjectId,
    friends_list: mongoose.Schema.Types.ObjectId,
})

module.exports = PlayerProfileDb.model('PlayerProfile', PlayerProfileSchema)