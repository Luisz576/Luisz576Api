import {Router} from 'express'

import ExpressAdapter from '../adapters/ExpressAdapter'
import punishmentsControllerFactory from '../factories/punishments/PunishmentsControllerFactory'
import authenticatorMiddlewareFactory from '../factories/auth/AuthenticatorMiddlewareFactory'

const routes = Router()

// middleware
const authenticator_middleware = authenticatorMiddlewareFactory()
routes.use((req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return authenticator_middleware.auth(adapter)
})

// <Punishments>
const punishmentsController = punishmentsControllerFactory()
routes.get('/:uuid', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return punishmentsController.search(adapter)
})
routes.post('/give', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return punishmentsController.store(adapter)
})
routes.delete('/:uuid/pardonall', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return punishmentsController.pardonall(adapter)
})

export default routes