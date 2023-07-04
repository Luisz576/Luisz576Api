import { IFriendListCreateProps, IFriendListSearchProps } from "../../domain/models/friends/FriendsList"
import FriendsList, { IFriendListModel } from "../../schemas/friends/FriendsList"
import { IFriendsListRepository } from "../../domain/repositories/friends/FriendsListRepository"

type FriendListDTO = {
    friends_list: IFriendListModel,
    player_profile_uuid: string
}

class FriendsListRepository implements IFriendsListRepository{
    async store(data: IFriendListCreateProps): Promise<IFriendListModel>{
        const friend_list = await FriendsList.create(data)
        if(friend_list){
            return friend_list
        }
        throw new Error("Can't create FriendList (store)")
    }
    async getById(id: string): Promise<IFriendListModel | null>{
        return await FriendsList.findById(id)
    }
    async search(filter: IFriendListSearchProps): Promise<IFriendListModel | null>{
        return await FriendsList.findOne(filter)
    }
    async insertFriend(data: FriendListDTO): Promise<void>{
        data.friends_list.friends.push({
            player_profile: data.player_profile_uuid,
        })
        await data.friends_list.save()
    }
    async removeFriend(data: FriendListDTO): Promise<void>{
        let targetIndex: number = -1
        const friends = data.friends_list.friends
        for(let i = 0; i < friends.length; i++){
            if(friends[i].player_profile == data.player_profile_uuid){
                targetIndex = i
                break
            }
        }
        if(targetIndex == -1){
            throw new Error("Players aren't friends (removeFriend)")
        }
        friends.splice(targetIndex, 1)
        await data.friends_list.save()
    }
}

const friendListRepository = new FriendsListRepository()

export default friendListRepository