const mongoose = require("mongoose");
const { FriendsDb } = require("../../services/database");

const FriendshipSchema = new mongoose.Schema({
    player_profile: {
        type: mongoose.Types.ObjectId,
        ref: 'PlayerProfile',
        require: true
    },
    friend_profile: {
        type: mongoose.Types.ObjectId,
        ref: 'PlayerProfile',
        require: true
    },
    friend_invite: {
        type: mongoose.Types.ObjectId,
        ref: 'FriendInvite',
        require: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = FriendsDb.model('Friendship', FriendshipSchema)