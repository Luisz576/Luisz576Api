import { ErrorType } from "../../domain/errors/error_type";
import { ILogError, logErrorFactory } from "../../domain/errors/errors";
import { IFriend } from "../../domain/models/friends/FriendsList";
import { IFriendsListRepository } from "../../domain/repositories/friends/FriendsListRepository";
import { Either, left, right } from "../../types/either";

type GetAllFriendsRequest = {
    uuid: string
}

export default class GetAllFriends{
    constructor(
        private friendsListRepository: IFriendsListRepository,
    ){}
    async execute(data: GetAllFriendsRequest): Promise<Either<ILogError, IFriend[]>>{
        try{
            const friends_list = await this.friendsListRepository.search({
                player_uuid: data.uuid
            })
            if(!friends_list){
                return left(logErrorFactory(ErrorType.generic, `FriendList not found (${data.uuid})`))
            }
            return right(friends_list.friends)
        }catch(err){
            return left(logErrorFactory(ErrorType.generic, err))
        }
    }
}