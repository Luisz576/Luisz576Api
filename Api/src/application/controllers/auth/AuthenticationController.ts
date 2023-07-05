import IRequest from '../../../domain/adapters/IRequest'
import IResponse from '../../../domain/adapters/IResponse'
import authenticator from '../../../services/authenticator'

export default class AuthenticatorController {
    async store(req: IRequest, res: IResponse){
        const { client_secret } = req.body
        if(client_secret && typeof(client_secret) == 'string'){
            const token = await authenticator.generateAplicationTokenByClientSecret(client_secret)
            if(token){
                return res.json({
                    status: 200,
                    token
                })
            }
        }
        return res.sendStatus(400)
    }
}