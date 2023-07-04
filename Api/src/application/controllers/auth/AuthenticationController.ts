import {Request, Response} from 'express'
import authenticator from '../../../services/authenticator'

export default {
    async store(req: Request, res: Response){
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