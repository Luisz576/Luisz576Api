const { TheBridgeDb } = require('../../services/database')
const mongoose = require('mongoose')

const TheBridgeGame = mongoose.Schema({
    timestamp: Date,
    game_mode: Number,
    map_name: String,
    players: [mongoose.Schema.Types.ObjectId],
    winners: [mongoose.Schema.Types.ObjectId],
})

module.exports = TheBridgeDb.model('TheBridgeGame', TheBridgeGame)