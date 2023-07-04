import { IFriendInvite } from "../../domain/models/friends/FriendInvite";
import { IFriendInviteRepository } from "../../domain/repositories/friends/FriendInviteRepository";
import { IPlayerProfileRepository } from "../../domain/repositories/player_profile/PlayerProfileRepository";
import { PromiseEither, left, right } from "../../types/either";

type CreateFriendInviteRequest = {
    sender_uuid: string,
    receiver_uuid: string
}

export class CreateFriendInvite{
    constructor(
        private friendInviteRepository: IFriendInviteRepository,
        private playerProfileRepository: IPlayerProfileRepository
    ){}
    async execute(data: CreateFriendInviteRequest): PromiseEither<any, IFriendInvite>{
        try{
            const sender = await this.playerProfileRepository.searchOne({
                uuid: data.sender_uuid
            })

            if(!sender){
                // TODO
                return left("")
            }

            if(await sender.areFriends(data.receiver_uuid)){
                // TODO
                return left("")
            }

            const invites = await this.friendInviteRepository.searchAll({
                sender: data.sender_uuid,
                receiver: data.receiver_uuid,
                accepted: false,
                valid_invite: true
            })

            for(let invite of invites){
                if(invite.stillValid()){
                    return left("")
                }else{
                    this.friendInviteRepository.expiresInvite(invite)
                }
            }

            const receiver = await this.playerProfileRepository.searchOne({
                uuid: data.sender_uuid
            })

            if(!receiver){
                // TODO
                return left("")
            }

            if(!receiver.friend_invites_preference){
                // TODO
                return left("")
            }

            const friend_invite = await this.friendInviteRepository.create({
                sender: data.sender_uuid,
                receiver: data.receiver_uuid
            })
            return right(friend_invite)
        }catch(err){
            return left(err)
        }
    }
}