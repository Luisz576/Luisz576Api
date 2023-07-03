import { OnlyExecutePromise, ReturnOrErrorPromise, left, right } from "../../types/either"
import { IFriendListCreateProps, IFriendListSearchProps } from "../../domain/models/friends/FriendsList"
import FriendsList, { IFriendListModel } from "../../schemas/friends/FriendsList"
import { IFriendsListRepository } from "../../domain/repositories/friends/FriendsListRepository"

type IFriendListOrError = ReturnOrErrorPromise<IFriendListModel>
type MaybeIFriendListOrError = ReturnOrErrorPromise<IFriendListModel | null>

type FriendListDTO = {
    friends_list: IFriendListModel,
    player_profile_uuid: string
}

class FriendsListRepository implements IFriendsListRepository{
    async store(data: IFriendListCreateProps): IFriendListOrError{
        try{
            const friend_list = await FriendsList.create(data)
            if(friend_list){
                return right(friend_list)
            }
            return left("Can't create FriendList (store)")
        }catch(err){
            return left(err)
        }
    }
    async search(filter: IFriendListSearchProps): MaybeIFriendListOrError{
        try{
            return right(await FriendsList.findOne(filter))
        }catch(err){
            return left(err)
        }
    }
    async insertFriend(data: FriendListDTO): OnlyExecutePromise{
        try{
            data.friends_list.friends.push({
                player_profile: data.player_profile_uuid,
            })
            await data.friends_list.save()
            return right(null)
        }catch(err){
            return left(err)
        }
    }
    async removeFriend(data: FriendListDTO): OnlyExecutePromise{
        try{
            let targetIndex: number = -1
            const friends = data.friends_list.friends
            for(let i = 0; i < friends.length; i++){
                if(friends[i].player_profile == data.player_profile_uuid){
                    targetIndex = i
                    break
                }
            }
            if(targetIndex == -1){
                return left("Players aren't friends (removeFriend)")
            }
            friends.splice(targetIndex, 1)
            await data.friends_list.save()
            return right(null)
        }catch(err){
            return left(err)
        }
    }
}

const friendListRepository = new FriendsListRepository()

export default friendListRepository