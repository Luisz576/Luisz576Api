const express = require('express')

const PlayerProfileController = require('./controllers/PlayerProfileController')
const PlayerProfileConfigsController = require('./controllers/PlayerProfileConfigsController')
const FriendsController = require('./controllers/FriendsController')
const PunishmentsController = require('./controllers/PunishmentsController')

const routes = express.Router()

// <PlayerProfile>
routes.get('/playerprofile/:uuid', PlayerProfileController.searsh)
routes.post('/playerprofile/newprofile', PlayerProfileController.store)
routes.patch('/playerprofile/:uuid/session', PlayerProfileController.session)
//configs
routes.patch('/playerprofile/:uuid/skin', PlayerProfileConfigsController.updateSkin)
routes.patch('/playerprofile/:uuid/role', PlayerProfileConfigsController.updateRole)
routes.patch('/playerprofile/:uuid/language', PlayerProfileConfigsController.updateLanguage)
routes.patch('/playerprofile/:uuid/changefriendinviteprefferences', PlayerProfileConfigsController.updateFriendInvitePrefferences)
routes.patch('/playerprofile/:uuid/updatesocialmedia', PlayerProfileConfigsController.updateSocialMedia)
//friends
routes.get('/playerprofile/:uuid/friends', FriendsController.searsh)
routes.post('/playerprofile/:uuid/newfriend', FriendsController.store)
routes.patch('/playerprofile/:uuid/acceptfriendinvite/:friend_uuid', FriendsController.accept)
routes.delete('/playerprofile/:uuid/removefriend', FriendsController.remove)

// <Punishments>
routes.get('/punishments/:uuid', PunishmentsController.searsh)
routes.post('/punishments/give', PunishmentsController.store)
routes.delete('/punishments/:uuid/removeall', PunishmentsController.removeall)

// MINIGAMES //
// <The Bridge>

module.exports = routes