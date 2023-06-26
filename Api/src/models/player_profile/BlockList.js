const { PlayerProfileDb } = require('../../services/database')
const mongoose = require('mongoose')

const BlockListSchema = new mongoose.Schema({
    player_profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerProfile',
        require: true
    },
    blocked_players: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'PlayerProfile',
        default: []
    }
})

module.exports = PlayerProfileDb.model('BlockList', BlockListSchema)