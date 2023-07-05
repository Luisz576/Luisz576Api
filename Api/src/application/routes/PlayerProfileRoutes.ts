import {Router} from 'express'

import AuthenticatorMiddleware from '../middlewares/AuthenticatorMiddleware'
// controllers
import PlayerProfileController from '../controllers/profiles/PlayerProfileController'
import PlayerProfileConfigsController from '../controllers/profiles/PlayerProfileConfigsController'
import FriendsController from '../controllers/friends/FriendsController'
import FriendInvitesController from '../controllers/friends/FriendInvitesController'
import BlocksController from '../controllers/blocks/BlocksController'
// usecases
import BlockPlayerProfile from '../../usecases/player_profile/BlockPlayerProfile'
import UnblockPlayerProfile from '../../usecases/player_profile/UnblockPlayerProfile'
import GetBlockedPlayersOfPlayerProfile from '../../usecases/player_profile/GetBlockedPlayersOfPlayerProfile'
import GetAllFriendInvitesOfPlayerProfile from '../../usecases/friends/GetAllFriendInvitesOfPlayerProfile'
import CreateFriendInvite from '../../usecases/friends/CreateFriendInvite'
import UpdateConfigsAndSocialOfPlayerProfile from '../../usecases/player_profile/UpdateConfigsAndSocialOfPlayerProfile'
import UpdatePlayerProfileRole from '../../usecases/player_profile/UpdatePlayerProfileRole'
import CreatePlayerProfile from '../../usecases/player_profile/CreatePlayerProfile'
import GetPlayerProfileByUUID from '../../usecases/player_profile/GetPlayerProfileByUUID'
import MakePlayerProfileSession from '../../usecases/player_profile/MakePlayerProfileSession'
// Repositories
import blockListRepository from '../../repositories/player_profile/BlockListRepository'
import playerProfileRepository from '../../repositories/player_profile/PlayerProfileRepository'
import friendInviteRepository from '../../repositories/friends/FriendInviteRepository'
import friendListRepository from '../../repositories/friends/FriendsListRepository'
import productsListRepository from '../../repositories/player_profile/ProductsListRepository'
import AcceptFriendInvite from '../../usecases/friends/AcceptFriendInvite'
import ExpressAdapter from '../../domain/adapters/ExpressAdapter'

const routes = Router()

// middleware
const authenticatorMiddleware = new AuthenticatorMiddleware()
routes.use((req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return authenticatorMiddleware.auth(adapter)
})

// <PlayerProfile>
// profile
const playerProfileController = new PlayerProfileController(
    new CreatePlayerProfile(playerProfileRepository, blockListRepository, friendListRepository, productsListRepository),
    new GetPlayerProfileByUUID(playerProfileRepository),
    new MakePlayerProfileSession(playerProfileRepository)
)
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
const playerProfileConfigsController = new PlayerProfileConfigsController(
    new UpdateConfigsAndSocialOfPlayerProfile(playerProfileRepository),
    new UpdatePlayerProfileRole(playerProfileRepository)
)
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
const friendsController = new FriendsController(
    
)
routes.get('/:uuid/friends', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return friendsController.search(adapter)
})
routes.delete('/:uuid/removefriend', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return friendsController.remove(adapter)
})

//invites
const friendInvitesController = new FriendInvitesController(
    new CreateFriendInvite(friendInviteRepository, playerProfileRepository),
    new GetAllFriendInvitesOfPlayerProfile(friendInviteRepository),
    new AcceptFriendInvite()
)
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
const blocksController = new BlocksController(
    new BlockPlayerProfile(blockListRepository, playerProfileRepository),
    new UnblockPlayerProfile(blockListRepository, playerProfileRepository),
    new GetBlockedPlayersOfPlayerProfile(blockListRepository, playerProfileRepository)
)
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