import {Router} from 'express'

import ExpressAdapter from '../adapters/ExpressAdapter'
import authenticatorMiddlewareFactory from '../factories/auth/AuthenticatorMiddlewareFactory'
import theBridgeControllerFactory from '../factories/games/the_bridge/TheBridgeControllerFactory'

const routes = Router()

// middleware
const authenticator_middleware = authenticatorMiddlewareFactory()
routes.use((req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return authenticator_middleware.auth(adapter)
})

// <The Bridge>
const theBridgeController = theBridgeControllerFactory()
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