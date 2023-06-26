const { FriendsDb } = require('../../services/database')
const mongoose = require('mongoose')

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
        default: Date.now
    },
    accepted: {
        type: Boolean,
        default: false
    },
})

module.exports = FriendsDb.model('FriendInvite', FriendInviteSchema)