const { Luisz576Db } = require('../../services/database')
const mongoose = require('mongoose')

const BlockListSchema = new mongoose.Schema({
    player_profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerProfile',
        required: true,
        immutable: true
    },
    blocked_players: {
        type: [{
            player_profile: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }],
        default: []
    }
})

module.exports = Luisz576Db.model('BlockList', BlockListSchema)