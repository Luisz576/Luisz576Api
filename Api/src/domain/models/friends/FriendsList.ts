import IEntity from "../IEntity"

export interface IFriendListCreateProps{
    player_uuid: string
}

export type IFriendListSearchProps = IFriendListCreateProps

export interface IFriend{
    player_uuid: string
    timestamp?: Date
}
export interface IFriendList extends IEntity, IFriendListCreateProps{
    friends: IFriend[]
}