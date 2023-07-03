import {Router} from 'express'

import authentication_controller from '../controllers/auth/AuthenticationController'

const routes = Router()

// <Authentication>
routes.post('/token', authentication_controller.store)

export default routes