import { FriendsDb } from "../../services/database"
import mongoose from "mongoose"

const FriendsListSchema = new mongoose.Schema({
    player_profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerProfile',
        required: true,
        immutable: true
    },
    friends: {
        type: [{
            player_profile: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now,
                immutable: true
            }
        }],
        default: []
    }
})

export default FriendsDb.model('FriendsList', FriendsListSchema)