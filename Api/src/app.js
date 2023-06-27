const { api_port } = require('../configs/configs.json')
const routes = require('./routes')
const express = require('express')
const http = require('http')

const app = express()
const server = http.Server(app)

app.use(express.json())
app.use('/api/v1', routes)

server.listen(api_port)