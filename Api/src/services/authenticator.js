const { secret } = require('../../configs/auth/auth_config.json')
const { clients } = require('../../configs/auth/clients.json')
const jwt = require('jsonwebtoken')

module.exports = {
    generateAplicationTokenByClientSecret(client_secret, expiresIn){
        let client
        for(let i in clients){
            if(clients[i].client_secret == client_secret){
                client = clients[i]
            }
        }
        if(!client){
            return undefined
        }
        return `${client.id}_${this.generateJWTToken({ "secret": client.secret }, expiresIn)}`
    },
    // default: 1 day
    generateJWTToken(payload = {}, expiresIn = 86400){
        return jwt.sign(payload, secret, { expiresIn })
    },
    verifyToken(token, callback = (_err, _decoded) => {}){
        jwt.verify(token, secret, callback)
    },
    getClientById(client_id){
        if(!client_id) return undefined
        for(let i in clients){
            if(clients[i].id == client_id){
                return {
                    "name": clients[i].name,
                    "secret": clients[i].secret,
                    "id": clients[i].id
                }
            }
        }
        return undefined
    }
}