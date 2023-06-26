const mongoose = require('mongoose')

const FriendsListSchema = new mongoose.Schema({
    player_profile: mongoose.Schema.Types.ObjectId,
    friends: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    }
})

//module.exports = FriendsListDb.model('FriendsList', FriendsListSchema)