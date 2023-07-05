import { IFriendInvite } from "../../domain/models/friends/FriendInvite";
import { IFriendInviteRepository } from "../../domain/repositories/friends/FriendInviteRepository";
import validator from "../../services/validator";
import { PromiseEither, left, right } from "../../types/either";

type GetAllFriendInvitesOfPlayerProfileRequest = {
    uuid: string,
    is_valid?: boolean,
    accepted?: boolean
}

export default class GetAllFriendInvitesOfPlayerProfile{
    constructor(
        private friendInviteRepository: IFriendInviteRepository
    ){}
    async execute(data: GetAllFriendInvitesOfPlayerProfileRequest): PromiseEither<any, IFriendInvite[]>{
        try{
            const filter = {
                receiver: data.uuid,
                ...(validator.validateBoolean(data.is_valid) && { is_valid: data.is_valid }),
                ...(validator.validateBoolean(data.accepted) && { accepted: data.accepted })
            }
            
            const invites = await this.friendInviteRepository.searchAll(filter)
            return right(invites)
        }catch(err){
            return left(err)
        }
    }
}