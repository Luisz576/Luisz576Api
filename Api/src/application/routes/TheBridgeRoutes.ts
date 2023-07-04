import {Router} from 'express'

import AuthenticatorMiddleware from '../middlewares/AuthenticatorMiddleware'
import TheBridgeController from '../controllers/games/TheBridgeController'

const routes = Router()

routes.use(AuthenticatorMiddleware)

// <The Bridge>
routes.post('/match', TheBridgeController.store)
routes.get('/:uuid/profile', TheBridgeController.searchProfile)
routes.get('/:uuid/matches', TheBridgeController.searchProfileMatches)

export default routes