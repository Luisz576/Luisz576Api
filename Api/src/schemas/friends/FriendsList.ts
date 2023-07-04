import { IFriendList } from "../../domain/models/friends/FriendsList"
import { FriendsDb } from "../../services/database"
import { Document, Schema } from "mongoose"

const FriendsListSchema = new Schema<IFriendList>({
    player_uuid: {
        type: String,
        required: true,
        immutable: true
    },
    friends: {
        type: [{
            player_uuid: {
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

export type IFriendListModel = IFriendList & Document
export default FriendsDb.model<IFriendListModel>('FriendsList', FriendsListSchema)