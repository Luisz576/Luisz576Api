import { IFriendInvite, IFriendInviteCreateProps, IFriendInviteSearchProps } from "../../models/friends/FriendInvite"

export interface IFriendInviteRepository{
    create(data: IFriendInviteCreateProps): Promise<IFriendInvite>
    searchOne(filter: IFriendInviteSearchProps): Promise<IFriendInvite | null>
    searchAll(filter: IFriendInviteSearchProps): Promise<IFriendInvite[]>
    expiresInvite(friend_invite: IFriendInvite): Promise<void>
    acceptInvite(friend_invite: IFriendInvite): Promise<void>
}