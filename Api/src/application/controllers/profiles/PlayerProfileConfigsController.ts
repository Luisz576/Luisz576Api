import roles from '../../../domain/roles'
import { validateLanguage } from '../../../domain/languages'
import { logError } from '../../../domain/errors/errors'
import validator from '../../../services/validator'
import UpdateConfigsAndSocialOfPlayerProfile from '../../../usecases/player_profile/UpdateConfigsAndSocialOfPlayerProfile'
import UpdatePlayerProfileRole from '../../../usecases/player_profile/UpdatePlayerProfileRole'
import IRequest from '../../../domain/adapters/IRequest'
import IResponse from '../../../domain/adapters/IResponse'

export default class PlayerProfileConfigsController{
    constructor(
        private updateConfigsAndSocialOfPlayerProfile: UpdateConfigsAndSocialOfPlayerProfile,
        private updatePlayerProfileRole: UpdatePlayerProfileRole
    ){}
    async updateSkin(req: IRequest, res: IResponse){
        const { uuid } = req.params
        const { skin } = req.body
        if(validator.validateUUID(uuid) && validator.validateString(skin)){
            const update_response = await this.updateConfigsAndSocialOfPlayerProfile.execute({
                uuid,
                skin
            })
            if(update_response.isRight()){
                return res.sendStatus(200)
            }
            logError(update_response.value, 'PlayerProfileConfigsController', 'updateSkin', 'UpdateConfigsAndSocialOfPlayerProfile')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    }
    async updateLanguage(req: IRequest, res: IResponse){
        const { uuid } = req.params
        const { language } = req.body
        if(validator.validateUUID(uuid) && validateLanguage(language)){
            const update_response = await this.updateConfigsAndSocialOfPlayerProfile.execute({
                uuid,
                language
            })
            if(update_response.isRight()){
                return res.sendStatus(200)
            }
            logError(update_response.value, 'PlayerProfileConfigsController', 'updateLanguage', 'UpdateConfigsAndSocialOfPlayerProfile')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    }
    async updateFriendInvitePreferences(req: IRequest, res: IResponse){
        const { uuid } = req.params
        const { friend_invites_preference } = req.body
        if(validator.validateUUID(uuid) && validator.validateBoolean(friend_invites_preference)){
            const update_response = await this.updateConfigsAndSocialOfPlayerProfile.execute({
                uuid,
                friend_invites_preference
            })
            if(update_response.isRight()){
                return res.sendStatus(200)
            }
            logError(update_response.value, 'PlayerProfileConfigsController', 'updateFriendInvitePreferences', 'UpdateConfigsAndSocialOfPlayerProfile')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    }
    // SOCIAL
    async updateSocialMedia(req: IRequest, res: IResponse){
        const { uuid } = req.params
        const { email, discord, twitch, youtube } = req.body
        if(validator.validateUUID(uuid)){
            const update_response = await this.updateConfigsAndSocialOfPlayerProfile.execute({
                uuid,
                email,
                discord,
                twitch,
                youtube
            })
            if(update_response.isRight()){
                return res.sendStatus(200)
            }
            logError(update_response.value, 'PlayerProfileConfigsController', 'updateSocialMedia', 'UpdateConfigsAndSocialOfPlayerProfile')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    }
    // ROLE
    async updateRole(req: IRequest, res: IResponse){
        const { uuid } = req.params
        const { applicator_uuid, role_id } = req.body
        if(validator.validateUUID(uuid) && validator.validateUUID(applicator_uuid) && typeof(role_id) == 'number' && roles.isRole(role_id)){
            const update_response = await this.updatePlayerProfileRole.execute({
                uuid,
                applicator_uuid,
                role_id
            })

            if(update_response.isRight()){
                return res.sendStatus(200)
            }
            logError(update_response.value, 'PlayerProfileConfigsController', 'updateRole', 'UpdatePlayerProfileRole')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    }
}