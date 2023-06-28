const { api_port } = require('../configs/server_config.json')
const PlayerProfileRoutes = require('./routes/PlayerProfileRoutes')
const PunishmentsRoutes = require('./routes/PunishmentsRoutes')
const AuthenticationRoutes = require('./routes/AuthenticationRoutes')

const express = require('express')
const http = require('http')
const cors = require('cors')

const app = express()
const server = http.Server(app)

app.use(cors())
app.use(express.json())
app.use('/api/v1/authentication', AuthenticationRoutes)
app.use('/api/v1/playerprofile', PlayerProfileRoutes)
app.use('/api/v1/punishments', PunishmentsRoutes)

server.listen(api_port)