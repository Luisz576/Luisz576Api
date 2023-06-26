const { TheBridgeDb } = require('../../services/database')
const mongoose = require('mongoose')

const TheBridgeGame = mongoose.Schema({
    players: Array,
    timestamp: Date,
    winners: Array,
    mode_name: Number,
    map_name: String,
})

module.exports = TheBridgeDb.model('TheBridgeGame', TheBridgeGame)