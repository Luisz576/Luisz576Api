import {Router} from 'express'

import authenticator_middleware from '../middlewares/AuthenticatorMiddleware'

import punishments_controller from '../controllers/PunishmentsController'

const routes = Router()

routes.use(authenticator_middleware)

// <Punishments>
routes.get('/:uuid', punishments_controller.search)
routes.post('/give', punishments_controller.store)
routes.delete('/:uuid/pardon', punishments_controller.pardon)
routes.delete('/:uuid/pardonall', punishments_controller.pardonall)

export default routes