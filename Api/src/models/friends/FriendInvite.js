const { FriendsDb } = require('../../services/database')
const mongoose = require('mongoose');

const FriendInviteSchema = new mongoose.Schema({
    sender: {
        type: String,
        require: true,
        immutable: true
    },
    receiver: {
        type: String,
        require: true,
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

FriendInviteSchema.static('findAllValidInvitesForPlayer', async function(receiver){
    const friendInvites = await this.find({
        receiver,
        valid_invite: true,
        accepted: false
    })
    const invites = []
    // procura convite valido
    for(let i in friendInvites){
        if(friendInvites[i].stillValid().isValid){
            invites.push(friendInvites[i])
        }
    }
    return invites
})

FriendInviteSchema.static('findValidInvite', async function(sender, receiver){
    const friendInvites = await this.find({
        sender,
        receiver,
        valid_invite: true,
        accepted: false
    })
    // procura convite valido
    for(let i in friendInvites){
        if(friendInvites[i].stillValid().isValid){
            return friendInvites[i]
        }
    }
    return undefined
})

module.exports = FriendsDb.model('FriendInvite', FriendInviteSchema)