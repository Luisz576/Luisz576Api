import { FriendsDb } from "../../services/database"
import mongoose from "mongoose"

const FriendInviteSchema = new mongoose.Schema({
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
    created: {
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

FriendInviteSchema.methods.getRemainingTimeInSeconds = function(){
    const timeInSeconds = Math.floor((Date.now() - this.created.getTime()) / 1000)
    if(timeInSeconds > 300){
        return 0
    }
    return 300 - timeInSeconds
}

FriendInviteSchema.methods.stillValid = function(){
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

export default FriendsDb.model('FriendInvite', FriendInviteSchema)