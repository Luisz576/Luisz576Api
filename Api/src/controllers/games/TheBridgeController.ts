import { Response, Request } from 'express'
import validator from '../../services/validator'

export default {
    async store(req: Request, res: Response){
        return res.sendStatus(501)
    },
    async searchProfile(req: Request, res: Response){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            return res.sendStatus(501)
        }
        return res.sendStatus(400)
    },
    async searchProfileMatches(req: Request, res: Response){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            return res.sendStatus(501)
        }
        return res.sendStatus(400)
    }
}