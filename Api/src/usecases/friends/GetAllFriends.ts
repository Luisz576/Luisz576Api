import { IFriend } from "../../domain/models/friends/FriendsList";
import { IFriendsListRepository } from "../../domain/repositories/friends/FriendsListRepository";
import { PromiseEither, left, right } from "../../types/either";

type GetAllFriendsRequest = {
    uuid: string
}

export default class GetAllFriends{
    constructor(
        private friendsListRepository: IFriendsListRepository,
    ){}
    async execute(data: GetAllFriendsRequest): PromiseEither<any, IFriend[]>{
        try{
            const friends_list = await this.friendsListRepository.search({
                player_uuid: data.uuid
            })
            if(!friends_list){
                // TODO
                return left("")
            }
            return right(friends_list.friends)
        }catch(err){
            return left(err)
        }
    }
}