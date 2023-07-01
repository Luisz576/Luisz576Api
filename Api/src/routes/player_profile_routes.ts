import express from 'express'

import authenticator_middleware from '../middlewares/authenticator_middleware'

import player_profile_controller from '../controllers/player_profile_controller'
import player_profile_configs_controller from '../controllers/player_profile_configs_controller'
import friends_controller from '../controllers/friends_controller'
import friend_invites_controller from '../controllers/friend_invites_controller'
import blocks_controller from '../controllers/blocks_controller'

const routes = express.Router()

routes.use(authenticator_middleware)

// <PlayerProfile>
routes.get('/:uuid', player_profile_controller.search)
routes.post('/newprofile', player_profile_controller.store)
routes.patch('/:uuid/session', player_profile_controller.session)

//configs
routes.patch('/:uuid/skin', player_profile_configs_controller.updateSkin)
routes.patch('/:uuid/role', player_profile_configs_controller.updateRole)
routes.patch('/:uuid/language', player_profile_configs_controller.updateLanguage)
routes.patch('/:uuid/changefriendinviteprefferences', player_profile_configs_controller.updateFriendInvitePrefferences)
routes.patch('/:uuid/updatesocialmedia', player_profile_configs_controller.updateSocialMedia)

//friends
routes.get('/:uuid/friends', friends_controller.search)
routes.delete('/:uuid/removefriend', friends_controller.remove)
routes.post('/:uuid/newfriend', friend_invites_controller.store)
routes.patch('/:uuid/acceptfriendinvite/:friend_uuid', friend_invites_controller.accept)
routes.get('/:uuid/friendinvites', friend_invites_controller.search)

//blocks
routes.get('/:uuid/blocks', blocks_controller.search)
routes.post('/:uuid/block', blocks_controller.store)
routes.delete('/:uuid/unblock', blocks_controller.delete)

export default routes