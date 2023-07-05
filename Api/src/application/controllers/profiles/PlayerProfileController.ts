import validator from '../../../services/validator'
import { logError } from '../../../domain/errors/errors'
import CreatePlayerProfile from '../../../usecases/player_profile/CreatePlayerProfile'
import GetPlayerProfileByUUID from '../../../usecases/player_profile/GetPlayerProfileByUUID'
import MakePlayerProfileSession from '../../../usecases/player_profile/MakePlayerProfileSession'
import IHttpContext from '../../../domain/interfaces/IHttpContext'

export default class PlayerProfileController{
    constructor(
        private createPlayerProfile: CreatePlayerProfile,
        private getPlayerProfileByUUID: GetPlayerProfileByUUID,
        private makePlayerProfileSession: MakePlayerProfileSession
    ){}
    async store(httpContext: IHttpContext){
        const { uuid, username } = httpContext.getRequest().body
        if(validator.validateUUID(uuid) && typeof(username) == 'string'){
            const profile_response = await this.createPlayerProfile.execute({
                uuid,
                username
            })
            if(profile_response.isRight()){
                return httpContext.getResponse().json({
                    status: 200,
                    profile: profile_response.value
                })
            }
            logError(profile_response.value, 'PlayerProfileController', 'store', 'CreatePlayerProfile')
            return httpContext.getResponse().sendStatus(500)
        }
        return httpContext.getResponse().sendStatus(400)
    }
    async search(httpContext: IHttpContext){
        const { uuid } = httpContext.getRequest().params
        if(validator.validateUUID(uuid)){
            const profile_response = await this.getPlayerProfileByUUID.execute({
                uuid
            })
            if(profile_response.isRight()){
                return httpContext.getResponse().json({
                    status: 200,
                    uuid,
                    profile: profile_response.value
                })
            }
            logError(profile_response.value, 'PlayerProfileController', 'search', 'GetPlayerProfileByUUID')
            return httpContext.getResponse().sendStatus(500)
        }
        return httpContext.getResponse().sendStatus(400)
    }
    async session(httpContext: IHttpContext){
        const { uuid } = httpContext.getRequest().params
        if(validator.validateUUID(uuid)){
            const session_response = await this.makePlayerProfileSession.execute({
                uuid
            })
            if(session_response.isRight()){
                return httpContext.getResponse().sendStatus(200)
            }
            logError(session_response.value, 'PlayerProfileController', 'session', 'MakePlayerSession')
            return httpContext.getResponse().sendStatus(500)
        }
        return httpContext.getResponse().sendStatus(400)
    }
}