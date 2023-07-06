import { IFriendInviteRepository } from "../../domain/repositories/friends/FriendInviteRepository";
import { IFriendsListRepository } from "../../domain/repositories/friends/FriendsListRepository";
import { IPlayerProfileRepository } from "../../domain/repositories/player_profile/PlayerProfileRepository";
import { PromiseEither, left, right } from "../../types/either";

type AcceptFriendInviteRequest = {
    uuid: string,
    friend_uuid: string
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
                uuid: data.uuid
            })
            if(!profile){
                // TODO
                return left("")
            }

            if(await profile.areFriends(data.friend_uuid)){
                // TODO
                return left("")
            }

            const friend_profile = await this.playerProfileRepository.searchOne({
                uuid: data.friend_uuid
            })
            if(!friend_profile){
                // TODO
                return left("")
            }

            const invite = await this.friendInviteRepository.searchOne({
                sender: data.uuid,
                receiver: data.friend_uuid,
                accepted: false,
                valid_invite: true
            })
            if(!invite){
                // TODO
                return left("")
            }

            await this.friendInviteRepository.acceptInvite(invite)
            await this.friendsListRepository.insertFriend({
                friends_list_id: profile.friends_list,
                player_profile_uuid: data.friend_uuid
            })
            await this.friendsListRepository.insertFriend({
                friends_list_id: friend_profile.friends_list,
                player_profile_uuid: data.uuid
            })

            return right(null)
        }catch(err){
            return left(err)
        }
    }
}