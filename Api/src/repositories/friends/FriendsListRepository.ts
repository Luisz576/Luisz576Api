import { Schema } from "mongoose"
import FriendsList, { IFriendList, IFriendListCreateProps, IFriendListSearchProps } from "../../models/friends/FriendsList"
import { OnlyExecutePromise, ReturnOrErrorPromise, left, right } from "../../types/either"

type IFriendListOrError = ReturnOrErrorPromise<IFriendList>
type MaybeIFriendListOrError = ReturnOrErrorPromise<IFriendList | null>

type FriendDTO = {
    friends_list?: IFriendList,
    friends_list_id?: Schema.Types.ObjectId,
    player_profile_uuid: string
}

export default {
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
    },
    async getById(friends_list_id: Schema.Types.ObjectId): MaybeIFriendListOrError{
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
                return left("Some parameter wasn't passed (insertFriend)")
            }
            const friends_list_response = await this.getById(data.friends_list_id)
            if(friends_list_response.isRight()){
                if(friends_list_response.value){
                    friends_list_response.value.friends.push({
                        player_profile: data.player_profile_uuid,
                    })
                    await friends_list_response.value.save()
                    return right(null)
                }
                return left("FriendList not founded (insertFriend)")
            }
            return left(friends_list_response.value)
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
                    if(friends_list_response.value){
                        friendsList = friends_list_response.value
                    }else{
                        return left("Can't find FriendList (removeFriend)")
                    }
                }
            }else{
                return left("No parameter was passed (removeFriend)")
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
                    return left("Players aren't friends (removeFriend)")
                }
                friends.splice(targetIndex, 1)
                await friendsList.save()
                return right(null)
            }
            return left("FriendList not founded (removeFriend)")
        }catch(err){
            return left(err)
        }
    }
}