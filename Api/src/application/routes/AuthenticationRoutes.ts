import {Router} from 'express'

import AuthenticationController from '../controllers/auth/AuthenticationController'

const routes = Router()

const authentication_controller = new AuthenticationController()
// <Authentication>
routes.post('/token', authentication_controller.store)

export default routes