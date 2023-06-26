const { FriendsDb } = require('../../services/database')
const mongoose = require('mongoose')

const FriendsListSchema = new mongoose.Schema({
    player_profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerProfile'
    },
    friends: {
        type: [{
            player_profile: mongoose.Schema.Types.ObjectId,
            timestamp: {
                type: Date,
                default: Date.now
            }
        }],
        default: []
    }
})

module.exports = FriendsDb.model('FriendsList', FriendsListSchema)