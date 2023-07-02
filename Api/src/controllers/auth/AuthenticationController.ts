import {Request, Response} from 'express'
import authenticator from '../../services/authenticator'

export default {
    async store(req: Request, res: Response){
        const { client_secret } = req.body
        if(client_secret){
            const token = authenticator.generateAplicationTokenByClientSecret(client_secret)
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