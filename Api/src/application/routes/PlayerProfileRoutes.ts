import {Router} from 'express'

import AuthenticatorMiddleware from '../middlewares/AuthenticatorMiddleware'
import PlayerProfileController from '../controllers/profiles/PlayerProfileController'
import PlayerProfileConfigsController from '../controllers/profiles/PlayerProfileConfigsController'
import FriendsController from '../controllers/friends/FriendsController'
import FriendInvitesController from '../controllers/friends/FriendInvitesController'
import BlocksController from '../controllers/blocks/BlocksController'

const routes = Router()

routes.use(AuthenticatorMiddleware)

// <PlayerProfile>
routes.get('/:uuid', PlayerProfileController.search)
routes.post('/newprofile', PlayerProfileController.store)
routes.patch('/:uuid/session', PlayerProfileController.session)

//configs
routes.patch('/:uuid/skin', PlayerProfileConfigsController.updateSkin)
routes.patch('/:uuid/role', PlayerProfileConfigsController.updateRole)
routes.patch('/:uuid/language', PlayerProfileConfigsController.updateLanguage)
routes.patch('/:uuid/changefriendinvitepreferences', PlayerProfileConfigsController.updateFriendInvitePreferences)
routes.patch('/:uuid/updatesocialmedia', PlayerProfileConfigsController.updateSocialMedia)

//friends
routes.get('/:uuid/friends', FriendsController.search)
routes.delete('/:uuid/removefriend', FriendsController.remove)

//invites
routes.post('/:uuid/newfriend', FriendInvitesController.store)
routes.patch('/:uuid/acceptfriendinvite/:friend_uuid', FriendInvitesController.accept)
routes.get('/:uuid/friendinvites', FriendInvitesController.search)

//blocks
routes.get('/:uuid/blocks', BlocksController.search)
routes.post('/:uuid/block', BlocksController.store)
routes.delete('/:uuid/unblock', BlocksController.delete)

export default routes