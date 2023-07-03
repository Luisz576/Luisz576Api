import {api_port} from './configs/configs.json'

import express from 'express'
import http from 'http'
import cors from 'cors'

import PlayerProfileRoutes from './routes/PlayerProfileRoutes'
import PunishmentsRoutes from './routes/PunishmentsRoutes'
import AuthenticationRoutes from './routes/AuthenticationRoutes'
import TheBridgeRoutes from './routes/TheBridgeRoutes'

const app = express()
const server = new http.Server(app)

app.use(cors())
app.use(express.json())

// routes
app.use('/api/v1/authentication', AuthenticationRoutes)
app.use('/api/v1/playerprofile', PlayerProfileRoutes)
app.use('/api/v1/punishments', PunishmentsRoutes)
// games
app.use('/api/v1/thebridge', TheBridgeRoutes)

server.listen(api_port)