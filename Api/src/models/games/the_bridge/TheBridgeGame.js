const { TheBridgeDb } = require('../../services/database')
const mongoose = require('mongoose')

const TheBridgeGame = mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    game_mode: {
        type: Number,
        required: true
    },
    map_name: {
        type: String,
        required: true
    },
    players: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    },
    winners: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    },
})

module.exports = TheBridgeDb.model('TheBridgeGame', TheBridgeGame)