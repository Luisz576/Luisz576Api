import { FriendsDb } from "../../services/database"
import { Schema, Document } from "mongoose"

export interface IFriendListCreateProps{
    player_profile: Schema.Types.ObjectId
}

export type IFriendListSearchProps = IFriendListCreateProps

export interface IFriend{
    player_profile: string
    timestamp?: Date
}
export interface IFriendList extends IFriendListCreateProps, Document{
    friends: IFriend[]
}

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