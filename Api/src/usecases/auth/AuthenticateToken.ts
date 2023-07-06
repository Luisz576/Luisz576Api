import authenticator from "../../services/authenticator";
import { Either, left, right } from "../../types/either";

type AuthenticateTokenResponse = {
    token: string
    callback: (result: Either<any, boolean>) => any
}

export default class AuthenticateToken{
    async execute(data: AuthenticateTokenResponse){
        try{
            if(typeof(data.token) != 'string'){
                return data.callback(right(false))
            }

            const tokenParts: string[] = data.token.split('._.')
    
            if(tokenParts.length !== 2){
                return data.callback(right(false))
            }
    
            const [ requester, token ] = tokenParts
            const clientData = authenticator.getClientById(requester)
    
            if(!clientData){
                return data.callback(right(false))
            }
    
            const getCacheToken = await authenticator.loadClientTokenFromCache(requester)
            if(getCacheToken){
                if(data.token == getCacheToken){
                    return data.callback(right(true))
                }
                return data.callback(right(false))
            }
    
            authenticator.verifyToken(token, (e, decoded) => {
                if(e || !decoded || typeof(decoded) == 'string'){
                    return data.callback(right(false))
                }
    
                if(decoded.secret){
                    if(decoded.secret == clientData.secret){
                        return data.callback(right(true))
                    }
                }
                return data.callback(right(false))
            })
            return data.callback(right(false))
        }catch(err){
            return data.callback(left(err))
        }
    }
}