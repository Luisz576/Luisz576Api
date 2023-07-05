import {Router} from 'express'

import AuthenticatorMiddleware from '../middlewares/AuthenticatorMiddleware'
import TheBridgeController from '../controllers/games/TheBridgeController'
import ExpressAdapter from '../../domain/adapters/ExpressAdapter'

const routes = Router()

// middleware
const authenticatorMiddleware = new AuthenticatorMiddleware()
routes.use((req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return authenticatorMiddleware.auth(adapter)
})

// <The Bridge>
const theBridgeController = new TheBridgeController(
    
)
routes.post('/match', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return theBridgeController.store(adapter)
})
routes.get('/:uuid/profile', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return theBridgeController.searchProfile(adapter)
})
routes.get('/:uuid/matches', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return theBridgeController.searchProfileMatches(adapter)
})

export default routes