import { OnlyExecutePromise, ReturnOrErrorPromise } from "../../../types/either"
import { IFriendList, IFriendListCreateProps, IFriendListSearchProps } from "../../models/friends/FriendsList"

type IFriendListOrError = ReturnOrErrorPromise<IFriendList>
type MaybeIFriendListOrError = ReturnOrErrorPromise<IFriendList | null>

type FriendListDTO = {
    friends_list: IFriendList,
    player_profile_uuid: string
}

export interface IFriendsListRepository{
    store(data: IFriendListCreateProps): IFriendListOrError
    search(filter: IFriendListSearchProps): MaybeIFriendListOrError
    insertFriend(data: FriendListDTO): OnlyExecutePromise
    removeFriend(data: FriendListDTO): OnlyExecutePromise
}