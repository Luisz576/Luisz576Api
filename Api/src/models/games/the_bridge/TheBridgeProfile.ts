// import { TheBridgeDb } from "../../../services/database"
// import mongoose from "mongoose"

// const TheBridgeProfileSchema = new mongoose.Schema({
//     player_profile: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'PlayerProfile',
//         required: true,
//         immutable: true
//     },
//     created_at: {
//         type: Date,
//         default: Date.now,
//         immutable: true
//     },
//     total_placed_blocks: {
//         type: Number,
//         default: 0,
//         min: 0
//     },
//     total_eaten_golden_apples: {
//         type: Number,
//         default: 0,
//         min: 0
//     },
//     total_score: {
//         type: Number,
//         default: 0,
//         min: 0
//     },
//     total_kills: {
//         type: Number,
//         default: 0,
//         min: 0
//     },
//     total_deaths: {
//         type: Number,
//         default: 0,
//         min: 0
//     },
//     //Wins
//     normal_mode_1v1_wins: {
//         type: Number,
//         default: 0,
//         min: 0
//     },
//     rush_mode_1v1_wins: {
//         type: Number,
//         default: 0,
//         min: 0
//     },
//     normal_mode_2v2_wins: {
//         type: Number,
//         default: 0,
//         min: 0
//     },
//     normal_mode_4v4_wins: {
//         type: Number,
//         default: 0,
//         min: 0
//     },
//     normal_mode_8v8_wins: {
//         type: Number,
//         default: 0,
//         min: 0
//     },
//     //Deaths
//     normal_mode_1v1_deaths: {
//         type: Number,
//         default: 0,
//         min: 0
//     },
//     rush_mode_1v1_deaths: {
//         type: Number,
//         default: 0,
//         min: 0
//     },
//     normal_mode_2v2_deaths: {
//         type: Number,
//         default: 0,
//         min: 0
//     },
//     normal_mode_4v4_deaths: {
//         type: Number,
//         default: 0,
//         min: 0
//     },
//     normal_mode_8v8_deaths: {
//         type: Number,
//         default: 0,
//         min: 0
//     },
//     //Kills
//     normal_mode_1v1_kills: {
//         type: Number,
//         default: 0,
//         min: 0
//     },
//     rush_mode_1v1_kills: {
//         type: Number,
//         default: 0,
//         min: 0
//     },
//     normal_mode_2v2_kills: {
//         type: Number,
//         default: 0,
//         min: 0
//     },
//     normal_mode_4v4_kills: {
//         type: Number,
//         default: 0,
//         min: 0
//     },
//     normal_mode_8v8_kills: {
//         type: Number,
//         default: 0,
//         min: 0
//     }
// })

// export default TheBridgeDb.model('TheBridgeProfile', TheBridgeProfileSchema)