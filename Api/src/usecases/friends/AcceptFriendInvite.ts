import { ErrorType } from "../../domain/errors/error_type";
import { ILogError, logErrorFactory } from "../../domain/errors/errors";
import { IFriendInviteRepository } from "../../domain/repositories/friends/FriendInviteRepository";
import { IFriendsListRepository } from "../../domain/repositories/friends/FriendsListRepository";
import { IPlayerProfileRepository } from "../../domain/repositories/player_profile/PlayerProfileRepository";
import { Either, left, right } from "../../types/either";

type AcceptFriendInviteRequest = {
    sender_uuid: string,
    receiver_uuid: string
}

export default class AcceptFriendInvite{
    constructor(
        private friendInviteRepository: IFriendInviteRepository,
        private friendsListRepository: IFriendsListRepository,
        private playerProfileRepository: IPlayerProfileRepository
    ){}
    async execute(data: AcceptFriendInviteRequest): Promise<Either<ILogError, null>>{
        try{
            const profile = await this.playerProfileRepository.searchOne({
                uuid: data.sender_uuid
            })
            if(!profile){
                return left(logErrorFactory(ErrorType.profile_not_founded))
            }

            if(await profile.areFriends(data.receiver_uuid)){
                return left(logErrorFactory(ErrorType.players_are_already_friends))
            }

            const friend_profile = await this.playerProfileRepository.searchOne({
                uuid: data.receiver_uuid
            })
            if(!friend_profile){
                return left(logErrorFactory(ErrorType.target_profile_not_found))
            }

            const invite = await this.friendInviteRepository.searchOne({
                sender: data.sender_uuid,
                receiver: data.receiver_uuid,
                accepted: false,
                valid_invite: true
            })
            if(!invite){
                return left(logErrorFactory(ErrorType.no_valid_friend_invite_found))
            }

            await this.friendInviteRepository.acceptInvite(invite)
            await this.friendsListRepository.insertFriend({
                friends_list_id: profile.friends_list,
                player_profile_uuid: data.receiver_uuid
            })
            await this.friendsListRepository.insertFriend({
                friends_list_id: friend_profile.friends_list,
                player_profile_uuid: data.sender_uuid
            })

            return right(null)
        }catch(err){
            return left(logErrorFactory(ErrorType.generic, err))
        }
    }
}