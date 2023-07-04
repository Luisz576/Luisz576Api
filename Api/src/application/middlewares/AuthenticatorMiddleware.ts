import { NextFunction, Request, Response } from "express"

import authenticator from '../../services/authenticator'
import { logError } from "../../domain/errors/errors"

export default async (req: Request, res: Response, next: NextFunction) => {
    const { auth_token } = req.headers

    if(typeof(auth_token) != 'string'){
        return res.sendStatus(401)
    }

    try{
        const tokenParts: string[] = auth_token.split('._.')

        if(tokenParts.length !== 2){
            return res.sendStatus(401)
        }

        const [ requester, token ] = tokenParts
        const clientData = authenticator.getClientById(requester)

        if(!clientData){
            return res.sendStatus(401)
        }

        const getCacheToken = await authenticator.loadClientTokenFromCache(requester)
        if(getCacheToken){
            if(auth_token == getCacheToken){
                return next()
            }
            return res.sendStatus(401)
        }

        authenticator.verifyToken(token, (e, decoded) => {
            if(e || !decoded || typeof(decoded) == 'string'){
                return res.sendStatus(401)
            }

            if(decoded.secret){
                if(decoded.secret == clientData.secret){
                    return next()
                }
            }
            return res.sendStatus(401)
        })
    }catch(e){
        logError(e, 'AuthenticationMiddleware', 'default', 'main') 
        return res.sendStatus(500)
    }
}