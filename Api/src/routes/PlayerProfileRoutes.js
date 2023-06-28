const express = require('express')

const PlayerProfileController = require('../controllers/PlayerProfileController')
const PlayerProfileConfigsController = require('../controllers/PlayerProfileConfigsController')
const FriendsController = require('../controllers/FriendsController')
const BlocksController = require('../controllers/BlocksController')

const routes = express.Router()

// <PlayerProfile>
routes.get('/:uuid', PlayerProfileController.searsh)
routes.post('/newprofile', PlayerProfileController.store)
routes.patch('/:uuid/session', PlayerProfileController.session)
//configs
routes.patch('/:uuid/skin', PlayerProfileConfigsController.updateSkin)
routes.patch('/:uuid/role', PlayerProfileConfigsController.updateRole)
routes.patch('/:uuid/language', PlayerProfileConfigsController.updateLanguage)
routes.patch('/:uuid/changefriendinviteprefferences', PlayerProfileConfigsController.updateFriendInvitePrefferences)
routes.patch('/:uuid/updatesocialmedia', PlayerProfileConfigsController.updateSocialMedia)
//friends
routes.get('/:uuid/friends', FriendsController.searsh)
routes.post('/:uuid/newfriend', FriendsController.store)
routes.patch('/:uuid/acceptfriendinvite/:friend_uuid', FriendsController.accept)
routes.delete('/:uuid/removefriend', FriendsController.remove)
//blocks
routes.get('/:uuid/blocks', BlocksController.searsh)
routes.post('/:uuid/block', BlocksController.store)
routes.delete('/:uuid/unblock', BlocksController.delete)

module.exports = routes