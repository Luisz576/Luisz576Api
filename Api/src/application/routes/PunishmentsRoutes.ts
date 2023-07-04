import {Router} from 'express'

import AuthenticatorMiddleware from '../middlewares/AuthenticatorMiddleware'
import PunishmentsController from '../controllers/punishments/PunishmentsController'

const routes = Router()

routes.use(AuthenticatorMiddleware)

// <Punishments>
routes.get('/:uuid', PunishmentsController.search)
routes.post('/give', PunishmentsController.store)
routes.delete('/:uuid/pardonall', PunishmentsController.pardonall)

export default routes