import { IFriendInviteCreateProps, IFriendInviteSearchProps } from "../../domain/models/friends/FriendInvite"
import { IFriendInviteRepository } from "../../domain/repositories/friends/FriendInviteRepository"
import FriendInvite, { IFriendInviteModel } from "../../schemas/friends/FriendInvite"

class FriendInviteRepository implements IFriendInviteRepository{
    async create(data: IFriendInviteCreateProps): Promise<IFriendInviteModel>{
        const friend_invite = await FriendInvite.create(data)
        if(friend_invite){
            return friend_invite
        }
        throw new Error("Can't create FriendInvite")
    }
    async searchOne(filter: IFriendInviteSearchProps): Promise<IFriendInviteModel | null>{
        return await FriendInvite.findOne(filter)
    }
    async searchAll(filter: IFriendInviteSearchProps): Promise<IFriendInviteModel[]>{
        return await FriendInvite.find(filter)
    }
    async expiresInvite(friend_invite: IFriendInviteModel): Promise<void>{
        friend_invite.expires()
        await friend_invite.save()
    }
    async acceptInvite(friend_invite: IFriendInviteModel): Promise<void>{
        friend_invite.accept()
        await friend_invite.save()
    }
}

const friendInviteRepository = new FriendInviteRepository()

export default friendInviteRepository