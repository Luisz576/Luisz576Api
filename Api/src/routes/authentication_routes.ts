import express from 'express'

import authentication_controller from '../controllers/auth/authentication_controller'

const routes = express.Router()

// <Authentication>
routes.post('/token', authentication_controller.store)

export default routes