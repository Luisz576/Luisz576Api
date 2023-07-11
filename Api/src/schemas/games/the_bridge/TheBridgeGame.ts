import { ITheBridgeGame, ITheBridgePlayer } from "../../../domain/models/games/the_bridge/TheBridgeGame"
import { IPlayerProfile } from "../../../domain/models/player_profile/PlayerProfile"
import { TheBridgeDb } from "../../../services/database"
import { Document, Schema } from "mongoose"

const TheBridgeGame = new Schema<ITheBridgeGame>({
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

export type ITheBridgeGameModel = ITheBridgeGame & Document
export default TheBridgeDb.model<ITheBridgeGameModel>('TheBridgeGame', TheBridgeGame)