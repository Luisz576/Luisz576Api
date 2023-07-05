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

const routes = Router()

routes.use(AuthenticatorMiddleware)

// <PlayerProfile>
// profile
const playerProfileController = new PlayerProfileController(
    new CreatePlayerProfile(playerProfileRepository, blockListRepository, friendListRepository, productsListRepository),
    new GetPlayerProfileByUUID(playerProfileRepository),
    new MakePlayerProfileSession(playerProfileRepository)
)
routes.get('/:uuid', playerProfileController.search)
routes.post('/newprofile', playerProfileController.store)
routes.patch('/:uuid/session', playerProfileController.session)

//configs
const playerProfileConfigsController = new PlayerProfileConfigsController(
    new UpdateConfigsAndSocialOfPlayerProfile(playerProfileRepository),
    new UpdatePlayerProfileRole(playerProfileRepository)
)
routes.patch('/:uuid/skin', playerProfileConfigsController.updateSkin)
routes.patch('/:uuid/role', playerProfileConfigsController.updateRole)
routes.patch('/:uuid/language', playerProfileConfigsController.updateLanguage)
routes.patch('/:uuid/changefriendinvitepreferences', playerProfileConfigsController.updateFriendInvitePreferences)
routes.patch('/:uuid/updatesocialmedia', playerProfileConfigsController.updateSocialMedia)

//friends
const friendsController = new FriendsController(
    
)
routes.get('/:uuid/friends', friendsController.search)
routes.delete('/:uuid/removefriend', friendsController.remove)

//invites
const friendInvitesController = new FriendInvitesController(
    new CreateFriendInvite(friendInviteRepository, playerProfileRepository),
    new GetAllFriendInvitesOfPlayerProfile(friendInviteRepository),
)
routes.post('/:uuid/newfriend', friendInvitesController.store)
routes.patch('/:uuid/acceptfriendinvite/:friend_uuid', friendInvitesController.accept)
routes.get('/:uuid/friendinvites', friendInvitesController.search)

//blocks
const blocksController = new BlocksController(
    new BlockPlayerProfile(blockListRepository, playerProfileRepository),
    new UnblockPlayerProfile(blockListRepository, playerProfileRepository),
    new GetBlockedPlayersOfPlayerProfile(blockListRepository, playerProfileRepository)
)
routes.get('/:uuid/blocks', blocksController.search)
routes.post('/:uuid/block', blocksController.store)
routes.delete('/:uuid/unblock', blocksController.delete)

export default routes