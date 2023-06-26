const { mongodb_connection_uri } = require('../../configs/configs.json')
const mongoose = require('mongoose')

const PlayerProfileDb = mongoose.createConnection(mongodb_connection_uri, {
    dbName: "Luisz576",
    serverSelectionTimeoutMS: 10000
})
.on('open', () => {
    console.log("[Luisz576Api] Conectado ao PlayerProfileDb!")
}).on('error', () => {
    console.log("[Luisz576Api] Erro ao conectar ao PlayerProfileDb!")
})

const TheBridgeDb = mongoose.createConnection(mongodb_connection_uri, {
    dbName: "TheBridge",
    serverSelectionTimeoutMS: 10000
})
.on('open', () => {
    console.log("[Luisz576Api] Conectado ao TheBridgeDb!")
}).on('error', () => {
    console.log("[Luisz576Api] Erro ao conectar ao TheBridgeDb!")
})

module.exports = {
    PlayerProfileDb,
    TheBridgeDb
}