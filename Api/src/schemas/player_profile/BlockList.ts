import { IBlockList } from "../../domain/models/player_profile/BlocksList"
import { Luisz576Db } from "../../services/database"
import { Document, Schema } from "mongoose"

const BlockListSchema = new Schema<IBlockList>({
    player_uuid: {
        type: String,
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

export type IBlockListModel = IBlockList & Document
export default Luisz576Db.model<IBlockList>('BlockList', BlockListSchema)