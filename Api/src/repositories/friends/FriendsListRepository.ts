import FriendsList, { IFriendList, IFriendListCreateProps, IFriendListSearchProps } from "../../models/friends/FriendsList"
import { OnlyExecutePromise, ReturnOrErrorPromise, left, right } from "../../types/either"

type IFriendListOrError = ReturnOrErrorPromise<IFriendList>
type MaybeIFriendListOrError = ReturnOrErrorPromise<IFriendList | undefined>

type FriendDTO = {
    friends_list?: IFriendList,
    friends_list_id?: string,
    player_profile_uuid: string
}

export default {
    async store(data: IFriendListCreateProps): IFriendListOrError{
        try{
            const friend_list = await FriendsList.create(data)
            if(friend_list){
                return right(friend_list)
            }
            return left("Can't create FriendList")
        }catch(err){
            return left(err)
        }
    },
    async getById(friends_list_id: string): MaybeIFriendListOrError{
        try{
            return right(await FriendsList.findById(friends_list_id))
        }catch(err){
            return left(err)
        }
    },
    async search(filter: IFriendListSearchProps): MaybeIFriendListOrError{
        try{
            return right(await FriendsList.findOne(filter))
        }catch(err){
            return left(err)
        }
    },
    async insertFriend(data: FriendDTO): OnlyExecutePromise{
        try{
            if(data.friends_list){
                data.friends_list.friends.push({
                    player_profile: data.player_profile_uuid,
                })
                await data.friends_list.save()
                return right(null)
            }
            if(!data.friends_list_id){
                return left("Some parameter wasn't passed")
            }
            const friends_list_response = await this.getById(data.friends_list_id)
            if(friends_list_response.isRight()){
                friends_list_response.value.friends.push({
                    player_profile: data.player_profile_uuid,
                })
                await friends_list_response.value.save()
                return right(null)
            }
            return left("FriendList not founded")
        }catch(err){
            return left(err)
        }
    },
    async removeFriend(data: FriendDTO): OnlyExecutePromise{
        try{
            let friendsList: IFriendList | undefined
            if(data.friends_list){
                friendsList = data.friends_list
            }else if(data.friends_list_id){
                const friends_list_response = await this.getById(data.friends_list_id)
                if(friends_list_response.isRight()){
                    friendsList = friends_list_response.value
                }
            }else{
                return left("No parameter was passed")
            }
            if(friendsList){
                let targetIndex: number = -1
                const friends = friendsList.friends
                for(let i = 0; i < friends.length; i++){
                    if(friends[i].player_profile == data.player_profile_uuid){
                        targetIndex = i
                        break
                    }
                }
                if(targetIndex == -1){
                    return left("Players aren't friends")
                }
                friends.splice(targetIndex, 1)
                await friendsList.save()
                return right(null)
            }
            return left("FriendList not founded")
        }catch(err){
            return left(err)
        }
    }
}