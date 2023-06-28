const express = require('express')

const AuthenticatorMiddleware = require('../middlewares/AuthenticatorMiddleware')

const PunishmentsController = require('../controllers/PunishmentsController')

const routes = express.Router()

routes.use(AuthenticatorMiddleware)

// <Punishments>
routes.get('/:uuid', PunishmentsController.searsh)
routes.post('/give', PunishmentsController.store)
routes.delete('/:uuid/pardon', PunishmentsController.pardon)
routes.delete('/:uuid/pardonall', PunishmentsController.pardonall)

module.exports = routes