import {Router} from 'express'

import AuthenticatorMiddleware from '../middlewares/AuthenticatorMiddleware'
import TheBridgeController from '../controllers/games/TheBridgeController'

const routes = Router()

routes.use(AuthenticatorMiddleware)

// <The Bridge>
const theBridgeController = new TheBridgeController(
    
)
routes.post('/match', theBridgeController.store)
routes.get('/:uuid/profile', theBridgeController.searchProfile)
routes.get('/:uuid/matches', theBridgeController.searchProfileMatches)

export default routes