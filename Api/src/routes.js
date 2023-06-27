const express = require('express')

const PlayerProfileController = require('./controllers/PlayerProfileController')
const PlayerProfileConfigsController = require('./controllers/PlayerProfileConfigsController')
const FriendsController = require('./controllers/FriendsController')

const routes = express.Router()

// <PlayerProfile>
routes.get('/api/playerprofile/:uuid', PlayerProfileController.searsh)
routes.post('/api/playerprofile/newprofile', PlayerProfileController.store)
routes.patch('/api/playerprofile/session', PlayerProfileController.session)
//social
routes.patch('/api/playerprofile/:uuid/updatesocialmedia', PlayerProfileController.updateSocialMedia)
//configs
routes.patch('/api/playerprofile/:uuid/skin', PlayerProfileConfigsController.updateSkin)
routes.patch('/api/playerprofile/:uuid/language', PlayerProfileConfigsController.updateLanguage)
routes.patch('/api/playerprofile/:uuid/changefriendinviteprefferences', PlayerProfileConfigsController.updateFriendInvitePrefferences)
//friends
routes.get('/api/playerprofile/:uuid/friends', FriendsController.searsh)
routes.post('/api/playerprofile/:uuid/newfriend', FriendsController.store)
routes.patch('/api/playerprofile/:uuid/acceptfriendinvite/:friend_uuid', FriendsController.accept)
routes.delete('/api/playerprofile/:uuid/removefriend', FriendsController.remove)

// <Punishments>

// MINIGAMES //
// <The Bridge>

module.exports = routes