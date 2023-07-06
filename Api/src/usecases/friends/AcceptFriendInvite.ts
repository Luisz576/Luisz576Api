import { IFriendInviteRepository } from "../../domain/repositories/friends/FriendInviteRepository";
import { IFriendsListRepository } from "../../domain/repositories/friends/FriendsListRepository";
import { IPlayerProfileRepository } from "../../domain/repositories/player_profile/PlayerProfileRepository";
import { PromiseEither, left, right } from "../../types/either";

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
    async execute(data: AcceptFriendInviteRequest): PromiseEither<any, null>{
        try{
            const profile = await this.playerProfileRepository.searchOne({
                uuid: data.sender_uuid
            })
            if(!profile){
                // TODO
                return left("a")
            }

            if(await profile.areFriends(data.receiver_uuid)){
                // TODO
                return left("b")
            }

            const friend_profile = await this.playerProfileRepository.searchOne({
                uuid: data.receiver_uuid
            })
            if(!friend_profile){
                // TODO
                return left("c")
            }

            const invite = await this.friendInviteRepository.searchOne({
                sender: data.sender_uuid,
                receiver: data.receiver_uuid,
                accepted: false,
                valid_invite: true
            })
            if(!invite){
                // TODO
                return left("d")
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
            return left(err)
        }
    }
}