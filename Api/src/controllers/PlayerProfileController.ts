import validator from '../services/validator'
import { Request, Response } from 'express'
import { getJsonError, logError } from '../errors/errors'
import PlayerProfileRepository from '../repositories/player_profile/PlayerProfileRepository'

export default {
    async store(req: Request, res: Response){
        const { uuid, username } = req.body
        if(validator.validateUUID(uuid) && typeof(username) == 'string'){
            // uuid
            const profileByUUID_reponse = await PlayerProfileRepository.search({uuid})
            if(profileByUUID_reponse.isRight()){
                if(profileByUUID_reponse.value){
                    return res.sendStatus(409)
                }
            }else{
                logError(profileByUUID_reponse.value, 'PlayerProfileController', 'store', 'PlayerProfileRepository.search')
                return res.sendStatus(500)
            }
            // username
            const profileByUsername_response = await PlayerProfileRepository.search({username})
            if(profileByUsername_response.isRight()){
                if(profileByUsername_response.value){
                    return res.sendStatus(409)
                }
            }else{
                logError(profileByUsername_response.value, 'PlayerProfileController', 'store', 'PlayerProfileRepository.search')
                return res.sendStatus(500)
            }
            // cria
            const profile_response = await PlayerProfileRepository.store({
                uuid,
                username
            })
            if(profile_response.isRight()){
                return res.json({
                    status: 200,
                    profile: profile_response.value
                })
            }
            logError(profile_response.value, 'PlayerProfileController', 'store', 'PlayerProfileRepository.store')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    },
    async search(req: Request, res: Response){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            const profile_response = await PlayerProfileRepository.search({uuid})
            if(profile_response.isRight()){
                if(profile_response.value){
                    return res.json({
                        status: 200,
                        profile: profile_response
                    })
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }
            logError(profile_response.value, 'PlayerProfileController', 'search', 'PlayerProfileRepository.search')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    },
    async session(req: Request, res: Response){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            const profile_response = await PlayerProfileRepository.search({uuid})
            if(profile_response.isRight()){
                const profile = profile_response.value
                if(profile){
                    const is_banned_response = await profile.isBanned()
                    if(is_banned_response.isRight()){
                        if(is_banned_response.value){
                            return res.json(getJsonError(220))
                        }
                        // session
                        const session_response = await PlayerProfileRepository.session({
                            player_profile: profile
                        })
                        if(session_response.isRight()){
                            return res.sendStatus(200)
                        }
                        logError(session_response.value, 'PlayerProfileController', 'session', 'PlayerProfileRepository.session')
                        return res.sendStatus(500)
                    }
                    logError(profile_response.value, 'PlayerProfileController', 'session', 'PlayerProfile.isBanned')
                    return res.sendStatus(500)
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }
            logError(profile_response.value, 'PlayerProfileController', 'session', 'PlayerProfileRepository.search')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    },
}