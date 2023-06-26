const express = require('express')

const PlayerProfileController = require('./controllers/PlayerProfileController')
const PlayerProfileConfigsController = require('./controllers/PlayerProfileConfigsController')
const FriendsController = require('./controllers/FriendsController')

const routes = express.Router()

// <PlayerProfile>
routes.get('/api/playerprofile/:uuid', PlayerProfileController.searsh)
routes.post('/api/playerprofile/newprofile', PlayerProfileController.store)
routes.patch('/api/playerprofile/session', PlayerProfileController.session)
//configs
routes.patch('/api/playerprofile/:uuid/skin', PlayerProfileConfigsController.updateSkin)
routes.patch('/api/playerprofile/:uuid/language', PlayerProfileConfigsController.updateLanguage)
//social
routes.patch('/api/playerprofile/:uuid/updatesocialmedia', PlayerProfileController.updateSocialMedia)
//friends
routes.patch('/api/playerprofile/:uuid/changefriendinviteprefferences', PlayerProfileController.changeFriendInvitePrefferences)
// TODO is friend
// TODO load friends
routes.post('/api/playerprofile/:uuid/newfriend', FriendsController.addFriend)
routes.patch('/api/playerprofile/:uuid/acceptfriendinvite/:friend_uuid', FriendsController.acceptFriendInvite)
routes.delete('/api/playerprofile/:uuid/removefriend', FriendsController.removeFriend)

// <Punishments>

// MINIGAMES //
// <The Bridge>

module.exports = routes