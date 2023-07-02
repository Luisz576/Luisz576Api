import validator from '../services/validator'
import { Request, Response } from 'express'
import { getJsonError, logError } from '../errors/errors'

export default {
    async store(req: Request, res: Response){
        const { uuid, username } = req.body
        if(validator.validateUUID(uuid) && username){
            try{
                // uuid
                const profileByUUID = await PlayerProfileRepository.search({
                    uuid
                })
                if(profileByUUID){
                    return res.sendStatus(409)
                }
                // username
                const profileByUsername = await PlayerProfileRepository.search({
                    username
                })
                if(profileByUsername){
                    return res.sendStatus(409)
                }
                // cria
                const profile = await PlayerProfileRepository.create({
                    uuid,
                    username
                })
                if(profile){
                    return res.json({
                        status: 200,
                        profile
                    })
                }
                return res.sendStatus(500)
            }catch(e){
                logError(e, 'PlayerProfileController', 'store')
                return res.sendStatus(500)
            }
        }
        return res.sendStatus(400)
    },
    async search(req: Request, res: Response){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            try{
                const profile = await PlayerProfileRepository.search({
                    uuid
                })
                if(profile){
                    return res.json({
                        status: 200,
                        profile
                    })
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }catch(e){
                logError(e, 'PlayerProfileController', 'searsh')
                return res.sendStatus(500)
            }
        }
        return res.sendStatus(400)
    },
    async session(req: Request, res: Response){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            try{
                const profile = await PlayerProfileRepository.search({
                    uuid
                })
                if(profile){
                    if(await profile.isBanned()){
                        return res.json(getJsonError(220))
                    }
                    // session
                    await PlayerProfileRepository.session({
                        player_profile: profile
                    })
                    return res.sendStatus(200)
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }catch(e){
                logError(e, 'PlayerProfileController', 'session')
                return res.sendStatus(500)
            }
        }
        return res.sendStatus(400)
    },
}