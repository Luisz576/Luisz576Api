import { Document, Schema } from "mongoose"
import { ITheBridgeGame } from "../../../models/games/the_bridge/TheBridgeGame"
import TheBridgeMode from "../../../games/the_bridge/TheBridgeMode"

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