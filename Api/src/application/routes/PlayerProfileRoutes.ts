import {Router} from 'express'

import ExpressAdapter from '../adapters/ExpressAdapter'
import playerProfileControllerFactory from '../factories/profiles/PlayerProfileControllerFactory'
import playerProfileConfigsControllerFactory from '../factories/profiles/PlayerProfileConfigsControllerFactory'
import friendsControllerFactory from '../factories/friends/FriendsControllerFactory'
import friendInvitesControllerFactory from '../factories/friends/FriendInvitesControllerFactory'
import blocksControllerFactory from '../factories/blocks/BlocksControllerFactory'
import authenticatorMiddlewareFactory from '../factories/auth/AuthenticatorMiddlewareFactory'

const routes = Router()

// middleware
const authenticator_middleware = authenticatorMiddlewareFactory()
routes.use((req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return authenticator_middleware.auth(adapter)
})

// <PlayerProfile>
// profile
const playerProfileController = playerProfileControllerFactory()
routes.get('/:uuid', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return playerProfileController.search(adapter)
})
routes.post('/newprofile', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return playerProfileController.store(adapter)
})
routes.patch('/:uuid/session', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return playerProfileController.session(adapter)
})

//configs
const playerProfileConfigsController = playerProfileConfigsControllerFactory()
routes.patch('/:uuid/skin', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return playerProfileConfigsController.updateSkin(adapter)
})
routes.patch('/:uuid/role', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return playerProfileConfigsController.updateRole(adapter)
})
routes.patch('/:uuid/language', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return playerProfileConfigsController.updateLanguage(adapter)
})
routes.patch('/:uuid/changefriendinvitepreferences', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return playerProfileConfigsController.updateFriendInvitePreferences(adapter)
})
routes.patch('/:uuid/updatesocialmedia', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return playerProfileConfigsController.updateSocialMedia(adapter)
})

//friends
const friendsController = friendsControllerFactory()
routes.get('/:uuid/friends', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return friendsController.search(adapter)
})
routes.delete('/:uuid/removefriend', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return friendsController.remove(adapter)
})

//invites
const friendInvitesController = friendInvitesControllerFactory()
routes.post('/:uuid/newfriend', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return friendInvitesController.store(adapter)
})
routes.patch('/:uuid/acceptfriendinvite/:friend_uuid', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return friendInvitesController.accept(adapter)
})
routes.get('/:uuid/friendinvites', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return friendInvitesController.search(adapter)
})

//blocks
const blocksController = blocksControllerFactory()
routes.get('/:uuid/blocks', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return blocksController.search(adapter)
})
routes.post('/:uuid/block', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return blocksController.store(adapter)
})
routes.delete('/:uuid/unblock', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return blocksController.delete(adapter)
})

export default routes