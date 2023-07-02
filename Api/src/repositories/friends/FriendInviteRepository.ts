import FriendInvite, { IFriendInvite, IFriendInviteCreateProps, IFriendInviteSearchProps } from "../../models/friends/FriendInvite"
import { OnlyExecutePromise, ReturnOrErrorPromise, left, right } from "../../types/either"

type IFriendInviteOrError = ReturnOrErrorPromise<IFriendInvite>
type MayberIFriendInviteOrError = ReturnOrErrorPromise<IFriendInvite | undefined>
type MayberIFriendInvitesOrError = ReturnOrErrorPromise<IFriendInvite[] | undefined>

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
    async searchAll(filter: IFriendInviteSearchProps): MayberIFriendInvitesOrError{
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