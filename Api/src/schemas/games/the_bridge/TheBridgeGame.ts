import { TheBridgeDb } from "../../../services/database"
import { Schema } from "mongoose"
import { IPlayerProfile } from "../../player_profile/PlayerProfile"
import { ITheBridgeGame, ITheBridgePlayer } from "../../../schemas/games/the_bridge/TheBridgeGame"

const TheBridgeGame = new Schema({
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
        type: [{
            uuid: {
                type: String,
                required: true
            },
            placed_blocks: {
                type: Number,
                required: true
            },
            eaten_golden_apples: {
                type: Number,
                required: true
            },
            score: {
                type: Number,
                required: true
            },
            kills: {
                type: Number,
                required: true
            },
            deaths: {
                type: Number,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now,
                immutable: true
            }
        }],
        required: true
    },
    winners: {
        type: [String],
        required: true
    },
})

TheBridgeGame.methods.getPlayers = async function(): Promise<IPlayerProfile[]>{
    throw new Error('Not implemented')
}

export function calculateProfileNetworkXP(player: ITheBridgePlayer, winner: boolean): number{
    // TODO
    return 0
}

export default TheBridgeDb.model<ITheBridgeGame>('TheBridgeGame', TheBridgeGame)