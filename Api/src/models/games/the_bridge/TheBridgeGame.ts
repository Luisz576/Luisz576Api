// import { TheBridgeDb } from "../../../services/database"
// import mongoose from "mongoose"

// const TheBridgeGame = new mongoose.Schema({
//     timestamp: {
//         type: Date,
//         default: Date.now,
//         immutable: true
//     },
//     game_mode: {
//         type: Number,
//         required: true
//     },
//     map_name: {
//         type: String,
//         required: true
//     },
//     players: {
//         type: [mongoose.Schema.Types.ObjectId],
//         required: true
//     },
//     winners: {
//         type: [mongoose.Schema.Types.ObjectId],
//         required: true
//     },
// })

// export default TheBridgeDb.model('TheBridgeGame', TheBridgeGame)