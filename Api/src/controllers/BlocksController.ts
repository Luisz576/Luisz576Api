import { getJsonError, logError } from '../errors/errors'
import { Request, Response } from 'express'
import validator from '../services/validator'
import PlayerProfileRepository from '../repositories/player_profile/PlayerProfileRepository'

export default {
    async search(req: Request, res: Response){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            const profile_response = await PlayerProfileRepository.search({uuid})
            if(profile_response.isRight()){
                if(profile_response.value){
                    const blocked_players_response = await profile_response.value.getBlocks()
                    if(blocked_players_response.isRight()){
                        return res.json({
                            status: 200,
                            uuid,
                            blocked_players: blocked_players_response.value
                        })
                    }
                    logError(blocked_players_response.value, 'BlocksController', 'search', 'PlayerProfile.getBlocks')
                    return res.sendStatus(500)
                }
                return res.json(getJsonError(10, { values: {uuid} }))
            }
            logError(profile_response.value, 'BlocksController', 'search', 'PlayerProfileRepository.search')
            return res.sendStatus(500)
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