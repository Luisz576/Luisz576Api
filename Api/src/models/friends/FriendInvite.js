const { FriendsDb } = require('../../services/database')
const mongoose = require('mongoose');

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
}, {
    methods: {
        getRemainingTimeInSeconds(){
            const timeInSeconds = Math.floor((Date.now() - this.created.getTime()) / 1000)
            if(timeInSeconds > 300){
                return 0
            }
            return 300 - timeInSeconds
        },
        stillValid(){
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
        },
        accept(){
            this.valid_invite = false
            this.accepted = true
        }
    }
})

// TODO passar para repository
FriendInviteSchema.static('findAllValidInvitesFor', async function(receiver){
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

module.exports = FriendsDb.model('FriendInvite', FriendInviteSchema)