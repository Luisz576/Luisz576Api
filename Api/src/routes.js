const express = require('express')

const PlayerProfile = require('./controllers/PlayerProfileController')

const routes = express.Router()

// PlayerProfile
routes.get('/api/playerprofile/:uuid', PlayerProfile.searsh)
routes.post('/api/playerprofile/newprofile', PlayerProfile.store)
routes.patch('/api/playerprofile/session', PlayerProfile.session)
routes.patch('/api/playerprofile/skin', PlayerProfile.skin)

// MINIGAMES //
// The Bridge

module.exports = routes