import { logError } from "../../domain/errors/errors"
import IHttpContext from '../../domain/interfaces/IHttpContext'
import AuthenticateToken from '../../usecases/auth/AuthenticateToken'

export default class AuthenticatorMiddleware{
    constructor(
        private authenticateToken: AuthenticateToken
    ){}
    async auth(httpContext: IHttpContext){
        const { auth_token } = httpContext.getRequest().headers
        if(auth_token){
            return this.authenticateToken.execute({
                token: auth_token,
                callback: (authentication_response) => {
                    if(authentication_response.isRight()){
                        if(authentication_response.value){
                            return httpContext.next()
                        }
                        return httpContext.getResponse().sendStatus(401)
                    }
                    logError(authentication_response.value, 'AuthenticationMiddleware', 'auth', 'AuthenticateToken') 
                    return httpContext.getResponse().sendStatus(500)
                }
            })
        }
        return httpContext.getResponse().sendStatus(401)
    }
}