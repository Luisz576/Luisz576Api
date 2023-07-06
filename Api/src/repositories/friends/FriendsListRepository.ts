import { IFriendListCreateProps, IFriendListSearchProps } from "../../domain/models/friends/FriendsList"
import FriendsList, { IFriendListModel } from "../../schemas/friends/FriendsList"
import { FriendsListDTO, IFriendsListRepository } from "../../domain/repositories/friends/FriendsListRepository"

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
    async insertFriend(data: FriendsListDTO): Promise<void>{
        const friends_list = await this.getById(data.friends_list_id)
        if(!friends_list){
            throw new Error("Can't find FriendsList")
        }
        friends_list.friends.push({
            player_uuid: data.player_profile_uuid,
        })
        await friends_list.save()
    }
    async removeFriend(data: FriendsListDTO): Promise<void>{
        const friends_list = await this.getById(data.friends_list_id)
        if(!friends_list){
            throw new Error("Can't find FriendsList")
        }
        let targetIndex: number = -1
        for(let i = 0; i < friends_list.friends.length; i++){
            if(friends_list.friends[i].player_uuid == data.player_profile_uuid){
                targetIndex = i
                break
            }
        }
        if(targetIndex == -1){
            throw new Error("Players aren't friends (removeFriend)")
        }
        friends_list.friends.splice(targetIndex, 1)
        await friends_list.save()
    }
}

const friendListRepository = new FriendsListRepository()

export default friendListRepository