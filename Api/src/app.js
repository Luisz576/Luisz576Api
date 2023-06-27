const { api_port } = require('../configs/configs.json')
const routes = require('./routes')
const express = require('express')
const http = require('http')
const cors = require('cors')

const app = express()
const server = http.Server(app)

app.use(cors())
app.use(express.json())
app.use('/api/v1', routes)

server.listen(api_port)