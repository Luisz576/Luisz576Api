import {Router} from 'express'

import AuthenticationController from '../controllers/auth/AuthenticationController'
import ExpressAdapter from '../../domain/adapters/ExpressAdapter'

const routes = Router()

const authentication_controller = new AuthenticationController()
// <Authentication>
routes.post('/token', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return authentication_controller.store(adapter)
})

export default routes