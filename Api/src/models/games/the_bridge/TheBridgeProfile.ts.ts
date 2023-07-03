import TheBridgeMode from "../../../domain/games/the_bridge/TheBridgeMode"
import { TheBridgeDb } from "../../../services/database"
import { Schema, Document } from "mongoose"
import { ITheBridgeGame } from "./TheBridgeGame"

export interface ITheBridgeProfileCreateProps{
    player_profile: Schema.Types.ObjectId
    uuid: string
}

export type ITheBridgeProfileSearchProps = Partial<ITheBridgeProfileCreateProps> & {
    total_placed_blocks?: number
    total_eaten_golden_apples?: number
    total_score?: number
    total_kills?: number
    total_deaths?: number
    // matches: Schema.Types.ObjectId[] // TODO colocar isso? ou fazer pesquisa geral?
    // wins
    normal_mode_1v1_wins?: number
    rush_mode_1v1_wins?: number
    normal_mode_2v2_wins?: number
    normal_mode_4v4_wins?: number
    normal_mode_8v8_wins?: number
    normal_mode_1v1v1v1_wins?: number
    normal_mode_2v2v2v2_wins?: number
    // deaths
    normal_mode_1v1_deaths?: number
    rush_mode_1v1_deaths?: number
    normal_mode_2v2_deaths?: number
    normal_mode_4v4_deaths?: number
    normal_mode_8v8_deaths?: number
    normal_mode_1v1v1v1_deaths?: number
    normal_mode_2v2v2v2_deaths?: number
    // kills
    normal_mode_1v1_kills?: number
    rush_mode_1v1_kills?: number
    normal_mode_2v2_kills?: number
    normal_mode_4v4_kills?: number
    normal_mode_8v8_kills?: number
    normal_mode_1v1v1v1_kills?: number
    normal_mode_2v2v2v2_kills?: number
}

export interface ITheBridgeProfile extends Required<ITheBridgeProfileSearchProps>, Document{
    created_at: Date
    getMatches(mode?: TheBridgeMode): Promise<ITheBridgeGame[]>
}

const TheBridgeProfileSchema = new Schema({
    player_profile: {
        type: Schema.Types.ObjectId,
        ref: 'PlayerProfile',
        required: true,
        immutable: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    total_placed_blocks: {
        type: Number,
        default: 0,
        min: 0
    },
    total_eaten_golden_apples: {
        type: Number,
        default: 0,
        min: 0
    },
    total_score: {
        type: Number,
        default: 0,
        min: 0
    },
    total_kills: {
        type: Number,
        default: 0,
        min: 0
    },
    total_deaths: {
        type: Number,
        default: 0,
        min: 0
    },
    // matches: {
    //     type: [Schema.Types.ObjectId],
    //     ref: 'TheBridgeGame',
    //     default: []
    // },
    //Wins
    normal_mode_1v1_wins: {
        type: Number,
        default: 0,
        min: 0
    },
    rush_mode_1v1_wins: {
        type: Number,
        default: 0,
        min: 0
    },
    normal_mode_2v2_wins: {
        type: Number,
        default: 0,
        min: 0
    },
    normal_mode_4v4_wins: {
        type: Number,
        default: 0,
        min: 0
    },
    normal_mode_8v8_wins: {
        type: Number,
        default: 0,
        min: 0
    },
    normal_mode_1v1v1v1_wins: {
        type: Number,
        default: 0,
        min: 0
    },
    normal_mode_2v2v2v2_wins: {
        type: Number,
        default: 0,
        min: 0
    },
    //Deaths
    normal_mode_1v1_deaths: {
        type: Number,
        default: 0,
        min: 0
    },
    rush_mode_1v1_deaths: {
        type: Number,
        default: 0,
        min: 0
    },
    normal_mode_2v2_deaths: {
        type: Number,
        default: 0,
        min: 0
    },
    normal_mode_4v4_deaths: {
        type: Number,
        default: 0,
        min: 0
    },
    normal_mode_8v8_deaths: {
        type: Number,
        default: 0,
        min: 0
    },
    normal_mode_1v1v1v1_deaths: {
        type: Number,
        default: 0,
        min: 0
    },
    normal_mode_2v2v2v2_deaths: {
        type: Number,
        default: 0,
        min: 0
    },
    //Kills
    normal_mode_1v1_kills: {
        type: Number,
        default: 0,
        min: 0
    },
    rush_mode_1v1_kills: {
        type: Number,
        default: 0,
        min: 0
    },
    normal_mode_2v2_kills: {
        type: Number,
        default: 0,
        min: 0
    },
    normal_mode_4v4_kills: {
        type: Number,
        default: 0,
        min: 0
    },
    normal_mode_8v8_kills: {
        type: Number,
        default: 0,
        min: 0
    },
    normal_mode_1v1v1v1_kills: {
        type: Number,
        default: 0,
        min: 0
    },
    normal_mode_2v2v2v2_kills: {
        type: Number,
        default: 0,
        min: 0
    },
})

TheBridgeProfileSchema.methods.getMatches = async function(mode?: TheBridgeMode): Promise<ITheBridgeGame[]>{
    throw new Error("Not implemented")
}

export default TheBridgeDb.model<ITheBridgeProfile>('TheBridgeProfile', TheBridgeProfileSchema)