const { FriendsDb } = require('../../services/database')
const mongoose = require('mongoose')

const FriendsListSchema = new mongoose.Schema({
    player_profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerProfile'
    },
    friends: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'PlayerProfile',
        default: []
    }
})

module.exports = FriendsDb.model('FriendsList', FriendsListSchema)