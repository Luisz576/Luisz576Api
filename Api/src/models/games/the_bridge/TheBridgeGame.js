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
        require: true
    },
    map_name: {
        type: String,
        require: true
    },
    players: {
        type: [mongoose.Schema.Types.ObjectId],
        require: true
    },
    winners: {
        type: [mongoose.Schema.Types.ObjectId],
        require: true
    },
})

module.exports = TheBridgeDb.model('TheBridgeGame', TheBridgeGame)