import { IFriendList, IFriendListCreateProps, IFriendListSearchProps } from "../../models/friends/FriendsList"

type FriendListDTO = {
    friends_list: IFriendList,
    player_profile_uuid: string
}

export interface IFriendsListRepository{
    store(data: IFriendListCreateProps): Promise<IFriendList>
    getById(id: string): Promise<IFriendList | null>
    search(filter: IFriendListSearchProps): Promise<IFriendList | null>
    insertFriend(data: FriendListDTO): Promise<void>
    removeFriend(data: FriendListDTO): Promise<void>
}