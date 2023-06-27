const { FriendsDb } = require('../../services/database')
const mongoose = require('mongoose');

const FriendInviteSchema = new mongoose.Schema({
    sender_profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerProfile'
    },
    receiver_profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerProfile'
    },
    created: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    accepted: {
        type: Boolean,
        default: false
    },
}, {
    methods: {
        stillValid(){
            if(this.accepted){
                return {
                    isValid: false,
                    remainingTimeInSeconds: 0
                }
            }
            //TODO
            return {
                isValid: true,
                remainingTimeInSeconds: 100
            }
        }
    }
})

module.exports = FriendsDb.model('FriendInvite', FriendInviteSchema)