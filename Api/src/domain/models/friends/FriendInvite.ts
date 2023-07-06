import IEntity from "../IEntity"

export interface IFriendInviteCreateProps{
    sender: string
    receiver: string
}

export interface IFriendInviteSearchProps extends Partial<IFriendInviteCreateProps>{
    valid_invite?: boolean
    accepted?: boolean
}

export interface IInviteFriendValidate{
    isValid: boolean
    remainingTimeInSeconds: number
}

export interface IFriendInvite extends IEntity, Required<IFriendInviteSearchProps>{
    created_at: Date
    accept(): void
    expires(): void
    stillValid(): IInviteFriendValidate
    getRemainingTimeInSeconds(): number
}