const express = require('express')

const PlayerProfileController = require('./controllers/PlayerProfileController')
const FriendsController = require('./controllers/FriendsController')

const routes = express.Router()

// <PlayerProfile>
routes.get('/api/playerprofile/:uuid', PlayerProfileController.searsh)
routes.post('/api/playerprofile/newprofile', PlayerProfileController.store)
routes.patch('/api/playerprofile/session', PlayerProfileController.session)
routes.patch('/api/playerprofile/skin', PlayerProfileController.skin)
//social
routes.patch('/api/playerprofile/:uuid/updatesocialmedia', PlayerProfileController.updateSocialMedia)
//friends
routes.patch('/api/playerprofile/:uuid/newfriend', FriendsController.addFriend)
routes.patch('/api/playerprofile/:uuid/accept/:friend_uuid', FriendsController.acceptFriendInvite)
routes.patch('/api/playerprofile/:uuid/removefriend', FriendsController.removeFriend)
routes.patch('/api/playerprofile/:uuid/changefriendinviteprefferences', FriendsController.changeFriendInvitePrefferences)

// <Punishments>

// MINIGAMES //
// <The Bridge>

module.exports = routes