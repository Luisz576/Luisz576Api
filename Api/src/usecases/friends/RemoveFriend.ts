import { IFriendsListRepository } from "../../domain/repositories/friends/FriendsListRepository";
import { IPlayerProfileRepository } from "../../domain/repositories/player_profile/PlayerProfileRepository";
import { PromiseEither, left, right } from "../../types/either";

type RemoveFriendRequest = {
    player_uuid: string,
    target_uuid: string
}

export default class RemoveFriend{
    constructor(
        private friendsListRepository: IFriendsListRepository,
        private playerProfileRepository: IPlayerProfileRepository
    ){}
    async execute(data: RemoveFriendRequest): PromiseEither<any, null>{
        try{
            const profile = await this.playerProfileRepository.searchOne({
                uuid: data.player_uuid
            })

            if(!profile){
                //TODO
                return left("")
            }

            if(!(await profile.areFriends(data.target_uuid))){
                //TODO
                return left("")
            }

            const target_profile = await this.playerProfileRepository.searchOne({
                uuid: data.target_uuid
            })

            if(!target_profile){
                //TODO
                return left("")
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
            return left(err)
        }
    }
}