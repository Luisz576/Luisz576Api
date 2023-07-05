import roles from '../../../domain/roles'
import { validateLanguage } from '../../../domain/languages'
import { logError } from '../../../domain/errors/errors'
import validator from '../../../services/validator'
import UpdateConfigsAndSocialOfPlayerProfile from '../../../usecases/player_profile/UpdateConfigsAndSocialOfPlayerProfile'
import UpdatePlayerProfileRole from '../../../usecases/player_profile/UpdatePlayerProfileRole'
import IHttpContext from '../../../domain/interfaces/IHttpContext'

export default class PlayerProfileConfigsController{
    constructor(
        private updateConfigsAndSocialOfPlayerProfile: UpdateConfigsAndSocialOfPlayerProfile,
        private updatePlayerProfileRole: UpdatePlayerProfileRole
    ){}
    async updateSkin(httpContext: IHttpContext){
        const { uuid } = httpContext.getRequest().params
        const { skin } = httpContext.getRequest().body
        if(validator.validateUUID(uuid) && validator.validateString(skin)){
            const update_response = await this.updateConfigsAndSocialOfPlayerProfile.execute({
                uuid,
                skin
            })
            if(update_response.isRight()){
                return httpContext.getResponse().sendStatus(200)
            }
            logError(update_response.value, 'PlayerProfileConfigsController', 'updateSkin', 'UpdateConfigsAndSocialOfPlayerProfile')
            return httpContext.getResponse().sendStatus(500)
        }
        return httpContext.getResponse().sendStatus(400)
    }
    async updateLanguage(httpContext: IHttpContext){
        const { uuid } = httpContext.getRequest().params
        const { language } = httpContext.getRequest().body
        if(validator.validateUUID(uuid) && validateLanguage(language)){
            const update_response = await this.updateConfigsAndSocialOfPlayerProfile.execute({
                uuid,
                language
            })
            if(update_response.isRight()){
                return httpContext.getResponse().sendStatus(200)
            }
            logError(update_response.value, 'PlayerProfileConfigsController', 'updateLanguage', 'UpdateConfigsAndSocialOfPlayerProfile')
            return httpContext.getResponse().sendStatus(500)
        }
        return httpContext.getResponse().sendStatus(400)
    }
    async updateFriendInvitePreferences(httpContext: IHttpContext){
        const { uuid } = httpContext.getRequest().params
        const { friend_invites_preference } = httpContext.getRequest().body
        if(validator.validateUUID(uuid) && validator.validateBoolean(friend_invites_preference)){
            const update_response = await this.updateConfigsAndSocialOfPlayerProfile.execute({
                uuid,
                friend_invites_preference
            })
            if(update_response.isRight()){
                return httpContext.getResponse().sendStatus(200)
            }
            logError(update_response.value, 'PlayerProfileConfigsController', 'updateFriendInvitePreferences', 'UpdateConfigsAndSocialOfPlayerProfile')
            return httpContext.getResponse().sendStatus(500)
        }
        return httpContext.getResponse().sendStatus(400)
    }
    // SOCIAL
    async updateSocialMedia(httpContext: IHttpContext){
        const { uuid } = httpContext.getRequest().params
        const { email, discord, twitch, youtube } = httpContext.getRequest().body
        if(validator.validateUUID(uuid)){
            const update_response = await this.updateConfigsAndSocialOfPlayerProfile.execute({
                uuid,
                email,
                discord,
                twitch,
                youtube
            })
            if(update_response.isRight()){
                return httpContext.getResponse().sendStatus(200)
            }
            logError(update_response.value, 'PlayerProfileConfigsController', 'updateSocialMedia', 'UpdateConfigsAndSocialOfPlayerProfile')
            return httpContext.getResponse().sendStatus(500)
        }
        return httpContext.getResponse().sendStatus(400)
    }
    // ROLE
    async updateRole(httpContext: IHttpContext){
        const { uuid } = httpContext.getRequest().params
        const { applicator_uuid, role_id } = httpContext.getRequest().body
        if(validator.validateUUID(uuid) && validator.validateUUID(applicator_uuid) && typeof(role_id) == 'number' && roles.isRole(role_id)){
            const update_response = await this.updatePlayerProfileRole.execute({
                uuid,
                applicator_uuid,
                role_id
            })

            if(update_response.isRight()){
                return httpContext.getResponse().sendStatus(200)
            }
            logError(update_response.value, 'PlayerProfileConfigsController', 'updateRole', 'UpdatePlayerProfileRole')
            return httpContext.getResponse().sendStatus(500)
        }
        return httpContext.getResponse().sendStatus(400)
    }
}