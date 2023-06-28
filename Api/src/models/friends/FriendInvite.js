const { FriendsDb } = require('../../services/database')
const mongoose = require('mongoose');

const FriendInviteSchema = new mongoose.Schema({
    sender_profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerProfile',
        immutable: true
    },
    receiver_profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerProfile',
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
}, {
    methods: {
        stillValid(){
            if(this.accepted || !this.valid_invite){
                return {
                    isValid: false,
                    remainingTimeInSeconds: 0
                }
            }
            // calcula tempo restante
            const timeInSeconds = Math.floor((Date.now() - this.created.getTime()) / 1000)
            if(timeInSeconds > 300){
                return {
                    isValid: false,
                    remainingTimeInSeconds: 0
                }
            }
            return {
                isValid: true,
                remainingTimeInSeconds: 300 - timeInSeconds
            }
        }
    }
})

FriendInviteSchema.static('findValidInvite', async function(sender_profile, receiver_profile){
    const friendInvites = await this.find({
        sender_profile,
        receiver_profile
    })
    // procura convite valido
    for(let i in friendInvites){
        const validateResult = friendInvites[i].stillValid()
        if(validateResult.isValid){
            return friendInvites[i]
        }
    }
    return undefined
})

module.exports = FriendsDb.model('FriendInvite', FriendInviteSchema)