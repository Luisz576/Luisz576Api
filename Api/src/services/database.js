const { createClient } = require('redis')

// Geral DB
// const Luisz576Db = mongoose.createConnection(mongodb_connection_uri, {
//     dbName: "Luisz576",
//     serverSelectionTimeoutMS: 10000
// })
// .on('open', () => {
//     console.log("[Luisz576Api] Conectado ao Luisz576Db!")
// }).on('error', () => {
//     console.error("[Luisz576Api] Erro ao conectar ao Luisz576Db!")
// })

// // Friends DB
// const FriendsDb = mongoose.createConnection(mongodb_connection_uri, {
//     dbName: "Friends",
//     serverSelectionTimeoutMS: 10000
// })
// .on('open', () => {
//     console.log("[Luisz576Api] Conectado ao FriendsDb!")
// }).on('error', () => {
//     console.error("[Luisz576Api] Erro ao conectar ao FriendsDb!")
// })

// // TheBridge DB
// const TheBridgeDb = mongoose.createConnection(mongodb_connection_uri, {
//     dbName: "TheBridge",
//     serverSelectionTimeoutMS: 10000
// })
// .on('open', () => {
//     console.log("[Luisz576Api] Conectado ao TheBridgeDb!")
// }).on('error', () => {
//     console.error("[Luisz576Api] Erro ao conectar ao TheBridgeDb!")
// })

// Redis
const redisCache = createClient()
redisCache.connect().then(() => {
    console.log('RedisClient created!')
})
redisCache.on('error', err => {
    console.error('RedisClient Error', err)
})

module.exports = {
    redisCache
}