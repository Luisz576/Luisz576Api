import { Document, Schema } from "mongoose"

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