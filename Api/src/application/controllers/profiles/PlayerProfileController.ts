import { Request, Response } from 'express'
import validator from '../../../services/validator'
import { logError } from '../../../domain/errors/errors'
import CreatePlayerProfile from '../../../usecases/player_profile/CreatePlayerProfile'
import GetPlayerProfileByUUID from '../../../usecases/player_profile/GetPlayerProfileByUUID'
import MakePlayerProfileSession from '../../../usecases/player_profile/MakePlayerProfileSession'

export default class PlayerProfileController{
    constructor(
        private createPlayerProfile: CreatePlayerProfile,
        private getPlayerProfileByUUID: GetPlayerProfileByUUID,
        private makePlayerProfileSession: MakePlayerProfileSession
    ){}
    async store(req: Request, res: Response){
        const { uuid, username } = req.body
        if(validator.validateUUID(uuid) && typeof(username) == 'string'){
            const profile_response = await this.createPlayerProfile.execute({
                uuid,
                username
            })
            if(profile_response.isRight()){
                return res.json({
                    status: 200,
                    profile: profile_response.value
                })
            }
            logError(profile_response.value, 'PlayerProfileController', 'store', 'CreatePlayerProfile')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    }
    async search(req: Request, res: Response){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            const profile_response = await this.getPlayerProfileByUUID.execute({
                uuid
            })
            if(profile_response.isRight()){
                return res.json({
                    status: 200,
                    uuid,
                    profile: profile_response.value
                })
            }
            logError(profile_response.value, 'PlayerProfileController', 'search', 'GetPlayerProfileByUUID')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    }
    async session(req: Request, res: Response){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            const session_response = await this.makePlayerProfileSession.execute({
                uuid
            })
            if(session_response.isRight()){
                return res.sendStatus(200)
            }
            logError(session_response.value, 'PlayerProfileController', 'session', 'MakePlayerSession')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    }
}