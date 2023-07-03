export interface IFriendListCreateProps{
    player_uuid: string
}

export type IFriendListSearchProps = IFriendListCreateProps

export interface IFriend{
    player_profile: string
    timestamp?: Date
}
export interface IFriendList extends IFriendListCreateProps{
    friends: IFriend[]
}