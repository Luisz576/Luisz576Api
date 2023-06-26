const { PlayerProfileDb } = require('../../services/database')
const mongoose = require('mongoose')

const PlayerProfileSchema = new mongoose.Schema({
    uuid: String,
    username: String,
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
    ban: {
        type: Boolean,
        default: true
    }
})

module.exports = PlayerProfileDb.model('PlayerProfile', PlayerProfileSchema)