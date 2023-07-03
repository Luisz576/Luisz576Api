import { IFriendList } from "../../domain/models/friends/FriendsList"
import { FriendsDb } from "../../services/database"
import { Schema } from "mongoose"

const FriendsListSchema = new Schema({
    player_profile: {
        type: Schema.Types.ObjectId,
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

export default FriendsDb.model<IFriendList>('FriendsList', FriendsListSchema)