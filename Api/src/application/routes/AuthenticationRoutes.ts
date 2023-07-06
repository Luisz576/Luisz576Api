import {Router} from 'express'

import AuthenticationController from '../controllers/auth/AuthenticationController'
import ExpressAdapter from '../adapters/ExpressAdapter'
import authenticationControllerFactory from '../factories/auth/AuthenticationControllerFactory'

const routes = Router()

// <Authentication>
const authentication_controller = authenticationControllerFactory()
routes.post('/token', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return authentication_controller.store(adapter)
})

export default routes