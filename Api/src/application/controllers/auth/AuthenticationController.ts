import IHttpContext from '../../../domain/interfaces/IHttpContext'
import authenticator from '../../../services/authenticator'

export default class AuthenticatorController {
    async store(httpContext: IHttpContext){
        const { client_secret } = httpContext.getRequest().body
        if(client_secret && typeof(client_secret) == 'string'){
            const token = await authenticator.generateAplicationTokenByClientSecret(client_secret)
            if(token){
                return httpContext.getResponse().json({
                    status: 200,
                    token
                })
            }
        }
        return httpContext.getResponse().sendStatus(400)
    }
}