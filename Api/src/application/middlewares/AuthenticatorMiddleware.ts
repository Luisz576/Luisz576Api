import authenticator from '../../services/authenticator'
import { logError } from "../../domain/errors/errors"
import IHttpContext from '../../domain/interfaces/IHttpContext'

export default class AuthenticatorMiddleware{
    async auth(httpContext: IHttpContext){
        const { auth_token } = httpContext.getRequest().headers
    
        if(typeof(auth_token) != 'string'){
            return httpContext.getResponse().sendStatus(401)
        }
    
        try{
            const tokenParts: string[] = auth_token.split('._.')
    
            if(tokenParts.length !== 2){
                return httpContext.getResponse().sendStatus(401)
            }
    
            const [ requester, token ] = tokenParts
            const clientData = authenticator.getClientById(requester)
    
            if(!clientData){
                return httpContext.getResponse().sendStatus(401)
            }
    
            const getCacheToken = await authenticator.loadClientTokenFromCache(requester)
            if(getCacheToken){
                if(auth_token == getCacheToken){
                    return httpContext.next()
                }
                return httpContext.getResponse().sendStatus(401)
            }
    
            authenticator.verifyToken(token, (e, decoded) => {
                if(e || !decoded || typeof(decoded) == 'string'){
                    return httpContext.getResponse().sendStatus(401)
                }
    
                if(decoded.secret){
                    if(decoded.secret == clientData.secret){
                        return httpContext.next()
                    }
                }
                return httpContext.getResponse().sendStatus(401)
            })
        }catch(e){
            logError(e, 'AuthenticationMiddleware', 'default', 'main') 
            return httpContext.getResponse().sendStatus(500)
        }
    }
}