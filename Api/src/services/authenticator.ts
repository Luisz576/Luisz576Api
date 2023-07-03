import auth_configs from '../configs/auth_config.json'
import jwt from 'jsonwebtoken'
import redis from './redis_client'

interface AllowedClient{
    name: string,
    secret: string,
    id: string
}

interface TokenDTO{
    client_id: string
    expires: number
    token: string
}

const DEFAULT_TOKEN_TIME = 86400

export default {
    DEFAULT_TOKEN_TIME,
    async generateAplicationTokenByClientSecret(client_secret: string, expiresIn?: number): Promise<string | undefined>{
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
        const expires: number = expiresIn ? expiresIn : DEFAULT_TOKEN_TIME
        const generated_token = `${client.id}._.${this.generateJWTToken({ secret: client.secret }, expiresIn)}`
        await this.saveClientTokenInCache({
            client_id: client.id,
            expires,
            token: generated_token
        })
        return generated_token
    },
    async loadClientTokenFromCache(client_id: string): Promise<string | null>{
        return await redis.get(`client_token_${client_id}`)
    },
    async saveClientTokenInCache(data: TokenDTO): Promise<string> {
        return await redis.setEx(`client_token_${data.client_id}`, data.expires, data.token)
    },
    // default: 1 day
    generateJWTToken(payload: Object, expiresIn?: number): string{
        if(!expiresIn){
            expiresIn = DEFAULT_TOKEN_TIME
        }
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