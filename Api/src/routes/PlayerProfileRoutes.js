const express = require('express')

const AuthenticatorMiddleware = require('../middlewares/AuthenticatorMiddleware')

const PlayerProfileController = require('../controllers/PlayerProfileController')
const PlayerProfileConfigsController = require('../controllers/PlayerProfileConfigsController')
const FriendsController = require('../controllers/FriendsController')
const FriendInvitesController = require('../controllers/FriendInvitesController')
const BlocksController = require('../controllers/BlocksController')

const routes = express.Router()

routes.use(AuthenticatorMiddleware)

// <PlayerProfile>
routes.get('/:uuid', PlayerProfileController.search)
routes.post('/newprofile', PlayerProfileController.store)
routes.patch('/:uuid/session', PlayerProfileController.session)

//configs
routes.patch('/:uuid/skin', PlayerProfileConfigsController.updateSkin)
routes.patch('/:uuid/role', PlayerProfileConfigsController.updateRole)
routes.patch('/:uuid/language', PlayerProfileConfigsController.updateLanguage)
routes.patch('/:uuid/changefriendinviteprefferences', PlayerProfileConfigsController.updateFriendInvitePrefferences)
routes.patch('/:uuid/updatesocialmedia', PlayerProfileConfigsController.updateSocialMedia)

//friends
routes.get('/:uuid/friends', FriendsController.search)
routes.delete('/:uuid/removefriend', FriendsController.remove)
routes.post('/:uuid/newfriend', FriendInvitesController.store)
routes.patch('/:uuid/acceptfriendinvite/:friend_uuid', FriendInvitesController.accept)
routes.get('/:uuid/friendinvites', FriendInvitesController.search)

//blocks
routes.get('/:uuid/blocks', BlocksController.search)
routes.post('/:uuid/block', BlocksController.store)
routes.delete('/:uuid/unblock', BlocksController.delete)

module.exports = routes