import { FriendsDb } from "../../services/database"
import { Schema, Document } from "mongoose"

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

export interface IFriendInvite extends Required<IFriendInviteSearchProps>, Document{
    created_at: Date
    accept(): void
    expires(): void
    stillValid(): IInviteFriendValidate
    getRemainingTimeInSeconds(): number
}

const FriendInviteSchema = new Schema({
    sender: {
        type: String,
        required: true,
        immutable: true
    },
    receiver: {
        type: String,
        required: true,
        immutable: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    valid_invite: {
        type: Boolean,
        default: true
    },
    accepted: {
        type: Boolean,
        default: false
    },
})

FriendInviteSchema.methods.getRemainingTimeInSeconds = function(): number{
    const timeInSeconds = Math.floor((Date.now() - this.created_at.getTime()) / 1000)
    if(timeInSeconds > 300){
        return 0
    }
    return 300 - timeInSeconds
}

FriendInviteSchema.methods.stillValid = function(): IInviteFriendValidate{
    if(this.accepted || !this.valid_invite){
        return {
            isValid: false,
            remainingTimeInSeconds: 0
        }
    }
    // calcula tempo restante
    const remainingTimeInSeconds = this.getRemainingTimeInSeconds()
    return {
        isValid: remainingTimeInSeconds != 0,
        remainingTimeInSeconds
    }
}

FriendInviteSchema.methods.accept = function(){
    this.valid_invite = false
    this.accepted = true
}

FriendInviteSchema.methods.expires = function(){
    this.valid_invite = false
}

export default FriendsDb.model<IFriendInvite>('FriendInvite', FriendInviteSchema)