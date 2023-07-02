import { FriendsDb } from "../../services/database"
import mongoose from "mongoose"

export interface IFriendListCreateProps{
    player_profile: mongoose.Schema.Types.ObjectId
}

interface IFriend{
    player_profile: string
    timestamp: Date
}
export interface IFriendList{
    player_profile: mongoose.Schema.Types.ObjectId
    friends: IFriend[]
}

const FriendsListSchema = new mongoose.Schema<IFriendList>({
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