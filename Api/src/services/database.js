const { mongodb_connection_uri } = require('../../configs/configs.json')
const mongoose = require('mongoose')

const Luisz576Db = mongoose.createConnection(mongodb_connection_uri, {
    dbName: "Luisz576",
    serverSelectionTimeoutMS: 10000
})
.on('open', () => {
    console.log("[Luisz576Api] Conectado ao Luisz576Db!")
}).on('error', () => {
    console.log("[Luisz576Api] Erro ao conectar ao Luisz576Db!")
})

const FriendsDb = mongoose.createConnection(mongodb_connection_uri, {
    dbName: "Friends",
    serverSelectionTimeoutMS: 10000
})
.on('open', () => {
    console.log("[Luisz576Api] Conectado ao FriendsDb!")
}).on('error', () => {
    console.log("[Luisz576Api] Erro ao conectar ao FriendsDb!")
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
    Luisz576Db,
    FriendsDb,
    TheBridgeDb
}