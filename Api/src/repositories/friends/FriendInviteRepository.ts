import { IFriendInvite, IFriendInviteCreateProps, IFriendInviteSearchProps } from "../../domain/models/friends/FriendInvite"
import FriendInvite from "../../schemas/friends/FriendInvite"
import { OnlyExecutePromise, ReturnOrErrorPromise, left, right } from "../../types/either"

type IFriendInviteOrError = ReturnOrErrorPromise<IFriendInvite>
type IFriendInvitesOrError = ReturnOrErrorPromise<IFriendInvite[]>
type MayberIFriendInviteOrError = ReturnOrErrorPromise<IFriendInvite | null>

export default {
    async create(data: IFriendInviteCreateProps): IFriendInviteOrError{
        try{
            const friend_invite = await FriendInvite.create(data)
            if(friend_invite){
                return right(friend_invite)
            }
            return left("Can't create FriendInvite")
        }catch(err){
            return left(err)
        }
    },
    async searchOne(filter: IFriendInviteSearchProps): MayberIFriendInviteOrError{
        try{
            return right(await FriendInvite.findOne(filter))
        }catch(err){
            return left(err)
        }
    },
    async searchAll(filter: IFriendInviteSearchProps): IFriendInvitesOrError{
        try{
            return right(await FriendInvite.find(filter))
        }catch(err){
            return left(err)
        }
    },
    async expiresInvite(friend_invite: IFriendInvite): OnlyExecutePromise{
        try{
            friend_invite.expires()
            await friend_invite.save()
            return right(null)
        }catch(err){
            return left(err)
        }
    },
    async acceptInvite(friend_invite: IFriendInvite): OnlyExecutePromise{
        try{
            friend_invite.accept()
            await friend_invite.save()
            return right(null)
        }catch(err){
            return left(err)
        }
    }
}