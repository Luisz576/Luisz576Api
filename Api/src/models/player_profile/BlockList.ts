import { Luisz576Db } from "../../services/database"
import mongoose from "mongoose"

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

export default Luisz576Db.model('BlockList', BlockListSchema)