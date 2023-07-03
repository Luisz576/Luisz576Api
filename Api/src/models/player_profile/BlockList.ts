import { Luisz576Db } from "../../services/database"
import { Schema, Document } from "mongoose"

export interface IBlockListCreateProps{
    player_profile: Schema.Types.ObjectId
}

export type IBlockListSearchProps = IBlockListCreateProps

export interface IBlockedPlayer{
    player_profile: string
    is_blocked?: boolean,
    timestamp?: Date
}
export interface IBlockList extends IBlockListCreateProps, Document{
    blocked_players: IBlockedPlayer[]
    block(playerUUID: string): boolean
    unblock(playerUUID: string): boolean
}

const BlockListSchema = new Schema({
    player_profile: {
        type: Schema.Types.ObjectId,
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
            is_blocked: {
                type: Boolean,
                default: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }],
        default: []
    }
})

BlockListSchema.methods.block = function(playerUUID: string) {
    for(let i in this.blocked_players){
        if(this.blocked_players[i].player_profile == playerUUID){
            this.blocked_players[i].is_blocked = true
            this.blocked_players[i].timestamp = new Date(Date.now())
            return
        }
    }
    this.blocked_players.push({
        player_profile: playerUUID,
    })
}

BlockListSchema.methods.unblock = function(playerUUID: string): boolean {
    for(let i in this.blocked_players){
        if(this.blocked_players[i].player_profile == playerUUID){
            this.blocked_players[i].is_blocked = false
            return true
        }
    }
    return false
}

export default Luisz576Db.model<IBlockList>('BlockList', BlockListSchema)