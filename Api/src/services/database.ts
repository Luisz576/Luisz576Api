import mongoose from "mongoose"

// Geral DB
export const Luisz576Db = mongoose.createConnection(process.env.DATABASE_URL, {
    dbName: "Luisz576",
    serverSelectionTimeoutMS: 10000
})
.on('open', () => {
    console.log("[Luisz576Api] Conectado ao Luisz576Db!")
}).on('error', () => {
    console.error("[Luisz576Api] Erro ao conectar ao Luisz576Db!")
})

// Friends DB
export const FriendsDb = mongoose.createConnection(process.env.DATABASE_URL, {
    dbName: "Friends",
    serverSelectionTimeoutMS: 10000
})
.on('open', () => {
    console.log("[Luisz576Api] Conectado ao FriendsDb!")
}).on('error', () => {
    console.error("[Luisz576Api] Erro ao conectar ao FriendsDb!")
})

// TheBridge DB
export const TheBridgeDb = mongoose.createConnection(process.env.DATABASE_URL, {
    dbName: "TheBridge",
    serverSelectionTimeoutMS: 10000
})
.on('open', () => {
    console.log("[Luisz576Api] Conectado ao TheBridgeDb!")
}).on('error', () => {
    console.error("[Luisz576Api] Erro ao conectar ao TheBridgeDb!")
})