import dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import cors from 'cors'

import PlayerProfileRoutes from './routes/PlayerProfileRoutes'
import PunishmentsRoutes from './routes/PunishmentsRoutes'
import AuthenticationRoutes from './routes/AuthenticationRoutes'

dotenv.config()

const app = express()
const server = new http.Server(app)

app.use(cors())
app.use(express.json())
app.use('/api/v1/authentication', AuthenticationRoutes)
app.use('/api/v1/playerprofile', PlayerProfileRoutes)
app.use('/api/v1/punishments', PunishmentsRoutes)

server.listen(process.env.API_PORT)