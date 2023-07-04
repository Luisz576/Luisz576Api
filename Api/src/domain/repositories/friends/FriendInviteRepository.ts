import { IFriendInvite, IFriendInviteCreateProps, IFriendInviteSearchProps } from "../../models/friends/FriendInvite"

type IFriendInviteOrError = ReturnOrErrorPromise<IFriendInvite>
type IFriendInvitesOrError = ReturnOrErrorPromise<IFriendInvite[]>
type MayberIFriendInviteOrError = ReturnOrErrorPromise<IFriendInvite | null>

export interface IFriendInviteRepository{
    create(data: IFriendInviteCreateProps): IFriendInviteOrError
    searchOne(filter: IFriendInviteSearchProps): MayberIFriendInviteOrError
    searchAll(filter: IFriendInviteSearchProps): IFriendInvitesOrError
    expiresInvite(friend_invite: IFriendInvite): OnlyExecutePromise
    acceptInvite(friend_invite: IFriendInvite): OnlyExecutePromise
}