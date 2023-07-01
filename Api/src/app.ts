import dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import cors from 'cors'

import PlayerProfileRoutes from './routes/player_profile_routes'
import PunishmentsRoutes from './routes/punishments_routes'
import AuthenticationRoutes from './routes/authentication_routes'

dotenv.config()

const app = express()
const server = new http.Server(app)

app.use(cors())
app.use(express.json())
app.use('/api/v1/authentication', AuthenticationRoutes)
app.use('/api/v1/playerprofile', PlayerProfileRoutes)
app.use('/api/v1/punishments', PunishmentsRoutes)

server.listen(process.env.API_PORT)