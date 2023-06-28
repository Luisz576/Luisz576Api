const express = require('express')

const AuthenticationController = require('../controllers/auth/AuthenticationController')

const routes = express.Router()

// <Authentication>
routes.post('/token', AuthenticationController.store)

module.exports = routes