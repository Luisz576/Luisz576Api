const { FriendsDb } = require('../../services/database')
const mongoose = require('mongoose')

const FriendsListSchema = new mongoose.Schema({
    player_profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerProfile',
        require: true,
        immutable: true
    },
    friends: {
        type: [{
            player_profile: {
                type: String,
                require: true
            },
            timestamp: {
                type: Date,
                default: Date.now,
                immutable: true
            }
        }],
        default: []
    }
})

module.exports = FriendsDb.model('FriendsList', FriendsListSchema)