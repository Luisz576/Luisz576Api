import auth_configs from '../configs/auth_config.json'
import jwt from 'jsonwebtoken'

interface AllowedClient{
    name: string,
    secret: string,
    id: string
}

export default {
    generateAplicationTokenByClientSecret(client_secret: string, expiresIn?: number): string | undefined{
        let client
        for(let i in auth_configs.clients){
            if(auth_configs.clients[i].client_secret == client_secret){
                client = auth_configs.clients[i]
                break
            }
        }
        if(!client){
            return undefined
        }
        return `${client.id}_${this.generateJWTToken({ secret: client.secret }, expiresIn)}`
    },
    // default: 1 day
    generateJWTToken(payload: Object, expiresIn = 86400): string{
        return jwt.sign(payload, auth_configs.auth_secret, { expiresIn })
    },
    verifyToken(token: string, callback?: jwt.VerifyCallback<string | jwt.JwtPayload> | undefined){
        jwt.verify(token, auth_configs.auth_secret, callback)
    },
    getClientById(client_id: string): AllowedClient | undefined{
        for(let i in auth_configs.clients){
            if(auth_configs.clients[i].id == client_id){
                return {
                    name: auth_configs.clients[i].name,
                    secret: auth_configs.clients[i].secret,
                    id: auth_configs.clients[i].id
                }
            }
        }
        return undefined
    }
}