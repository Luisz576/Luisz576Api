import { Document } from "mongoose"
import { IPlayerProfile } from "../../../models/player_profile/PlayerProfile"

export interface ITheBridgePlayer {
    uuid: string
    placed_blocks: number
    eaten_golden_apples: number
    score: number
    kills: number
    deaths: number
    timestamp: Date
}

export interface ITheBridgeGameCreateProps extends Required<ITheBridgeGameSearchProps>{
    players: ITheBridgePlayer[]
    winners: string[]
}

export interface ITheBridgeGameSearchProps{
    game_mode?: number
    map_name?: string
}

export interface ITheBridgeGame extends ITheBridgeGameCreateProps, Document{
    timestamp: Date
    getPlayers(): Promise<IPlayerProfile[]>
}