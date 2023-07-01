import express from 'express'

import authenticator_middleware from '../middlewares/authenticator_middleware'

import punishments_controller from '../controllers/punishments_controller'

const routes = express.Router()

routes.use(authenticator_middleware)

// <Punishments>
routes.get('/:uuid', punishments_controller.search)
routes.post('/give', punishments_controller.store)
routes.delete('/:uuid/pardon', punishments_controller.pardon)
routes.delete('/:uuid/pardonall', punishments_controller.pardonall)

export default routes