import { ErrorType } from "../../domain/errors/error_type";
import { ILogError, logErrorFactory } from "../../domain/errors/errors";
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
    async execute(data: CreateFriendInviteRequest): PromiseEither<ILogError, IFriendInvite>{
        try{
            const sender = await this.playerProfileRepository.searchOne({
                uuid: data.sender_uuid
            })

            if(!sender){
                return left(logErrorFactory(ErrorType.target_profile_not_found, {profile_not_founded: "sender"}))
            }

            console.log(data.sender_uuid, data.receiver_uuid, await sender.areFriends(data.receiver_uuid))

            if(await sender.areFriends(data.receiver_uuid)){
                return left(logErrorFactory(ErrorType.players_are_already_friends))
            }

            const invites = await this.friendInviteRepository.searchAll({
                sender: data.sender_uuid,
                receiver: data.receiver_uuid,
                accepted: false,
                valid_invite: true
            })

            for(let invite of invites){
                if(invite.stillValid()){
                    return left(logErrorFactory(ErrorType.friend_invite_already_sent))
                }else{
                    this.friendInviteRepository.expiresInvite(invite)
                }
            }

            const receiver = await this.playerProfileRepository.searchOne({
                uuid: data.sender_uuid
            })

            if(!receiver){
                return left(logErrorFactory(ErrorType.target_profile_not_found, {profile_not_founded: "sender"}))
            }

            if(!receiver.friend_invites_preference){
                return left(logErrorFactory(ErrorType.incompatible_friend_invite_prefference))
            }

            const friend_invite = await this.friendInviteRepository.create({
                sender: data.sender_uuid,
                receiver: data.receiver_uuid
            })
            return right(friend_invite)
        }catch(err){
            return left(logErrorFactory(ErrorType.generic, err))
        }
    }
}