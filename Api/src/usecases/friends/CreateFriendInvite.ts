import { IFriendInvite } from "../../domain/models/friends/FriendInvite";
import { IFriendInviteRepository } from "../../domain/repositories/friends/FriendInviteRepository";
import { IPlayerProfileRepository } from "../../domain/repositories/player_profile/PlayerProfileRepository";
import { PromiseEither, left, right } from "../../types/either";

type CreateFriendInviteRequest = {
    sender_uuid: string,
    receiver_uuid: string
}

export default class CreateFriendInvite{
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
                return left("a")
            }

            console.log(data.sender_uuid, data.receiver_uuid, await sender.areFriends(data.receiver_uuid))

            if(await sender.areFriends(data.receiver_uuid)){
                // TODO
                return left("b")
            }

            const invites = await this.friendInviteRepository.searchAll({
                sender: data.sender_uuid,
                receiver: data.receiver_uuid,
                accepted: false,
                valid_invite: true
            })

            for(let invite of invites){
                if(invite.stillValid()){
                    return left("c")
                }else{
                    this.friendInviteRepository.expiresInvite(invite)
                }
            }

            const receiver = await this.playerProfileRepository.searchOne({
                uuid: data.sender_uuid
            })

            if(!receiver){
                // TODO
                return left("d")
            }

            if(!receiver.friend_invites_preference){
                // TODO
                return left("e")
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