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

// TODO desacoplar
export interface ITheBridgeGame<ID> extends ITheBridgeGameCreateProps{
    timestamp: Date
    getPlayers(): Promise<IPlayerProfile<ID>[]>
}