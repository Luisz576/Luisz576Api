import { getJsonError, logError } from '../errors/errors'
import { Request, Response } from 'express'
import validator from '../services/validator'

export default {
    async search(req: Request, res: Response){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            try{
                const profile = await PlayerProfileRepository.search({
                    uuid
                })
                if(profile){
                    const blocked_players = await profile.getBlocks()
                    return res.json({
                        status: 200,
                        uuid,
                        blocked_players
                    })
                }
                return res.json(getJsonError(10, { values: {uuid} }))
            }catch(e){
                logError(e, 'BlocksController', 'search')
                return res.sendStatus(500)
            }
        }
        return res.sendStatus(400)
    },
    async store(req: Request, res: Response){
        return res.sendStatus(501)
    },
    async delete(req: Request, res: Response){
        return res.sendStatus(501)
    }
}