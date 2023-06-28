const express = require('express')

const PunishmentsController = require('../controllers/PunishmentsController')

const routes = express.Router()

// <Punishments>
routes.get('/:uuid', PunishmentsController.searsh)
routes.post('/give', PunishmentsController.store)
routes.delete('/:uuid/pardonall', PunishmentsController.pardonall)

module.exports = routes