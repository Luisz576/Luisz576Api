import { ErrorType } from "../../domain/errors/error_type";
import { ILogError, logErrorFactory } from "../../domain/errors/errors";
import { IFriendsListRepository } from "../../domain/repositories/friends/FriendsListRepository";
import { IPlayerProfileRepository } from "../../domain/repositories/player_profile/PlayerProfileRepository";
import { Either, left, right } from "../../types/either";

type RemoveFriendRequest = {
    player_uuid: string,
    target_uuid: string
}

export default class RemoveFriend{
    constructor(
        private friendsListRepository: IFriendsListRepository,
        private playerProfileRepository: IPlayerProfileRepository
    ){}
    async execute(data: RemoveFriendRequest): Promise<Either<ILogError, null>>{
        try{
            const profile = await this.playerProfileRepository.searchOne({
                uuid: data.player_uuid
            })

            if(!profile){
                return left(logErrorFactory(ErrorType.profile_not_founded))
            }

            if(!(await profile.areFriends(data.target_uuid))){
                return left(logErrorFactory(ErrorType.players_arent_friends))
            }

            const target_profile = await this.playerProfileRepository.searchOne({
                uuid: data.target_uuid
            })

            if(!target_profile){
                return left(logErrorFactory(ErrorType.target_profile_not_found))
            }

            await this.friendsListRepository.removeFriend({
                friends_list_id: profile.friends_list,
                player_profile_uuid: data.target_uuid
            })

            await this.friendsListRepository.removeFriend({
                friends_list_id: target_profile.friends_list,
                player_profile_uuid: data.player_uuid
            })

            return right(null)
        }catch(err){
            return left(logErrorFactory(ErrorType.generic, err))
        }
    }
}