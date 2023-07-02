import { Luisz576Db } from "../../services/database"
import mongoose from "mongoose"

export interface IBlockListCreateProps{
    player_profile: mongoose.Schema.Types.ObjectId
}

export type IBlockListSearchProps = IBlockListCreateProps

export interface IBlockedPlayer{
    player_profile: string
    timestamp?: Date
}
export interface IBlockList extends IBlockListCreateProps, mongoose.Document{
    blocked_players: IBlockedPlayer[]
}

const BlockListSchema = new mongoose.Schema({
    player_profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerProfile',
        required: true,
        immutable: true
    },
    blocked_players: {
        type: [{
            player_profile: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }],
        default: []
    }
})

export default Luisz576Db.model<IBlockList>('BlockList', BlockListSchema)