import { IFriendList, IFriendListCreateProps, IFriendListSearchProps } from "../../models/friends/FriendsList"

export type FriendsListDTO = {
    friends_list_id: string,
    player_profile_uuid: string
}

export interface IFriendsListRepository{
    store(data: IFriendListCreateProps): Promise<IFriendList>
    getById(id: string): Promise<IFriendList | null>
    search(filter: IFriendListSearchProps): Promise<IFriendList | null>
    insertFriend(data: FriendsListDTO): Promise<void>
    removeFriend(data: FriendsListDTO): Promise<void>
}