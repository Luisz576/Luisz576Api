import roles from '../../../domain/roles'
import { validateLanguage } from '../../../domain/languages'
import { Request, Response } from 'express'
import { logError } from '../../../domain/errors/errors'
import validator from '../../../services/validator'
import { UpdateConfigsAndSocialOfProfile } from '../../../usecases/player_profile/UpdateConfigsAndSocialOfProfile'
import playerProfileRepository from '../../../repositories/player_profile/PlayerProfileRepository'
import { UpdateProfileRole } from '../../../usecases/player_profile/UpdateProfileRole'

class PlayerProfileConfigsController{
    constructor(
        private updateConfigsAndSocialOfProfile: UpdateConfigsAndSocialOfProfile,
        private updateProfileRole: UpdateProfileRole
    ){}
    async updateSkin(req: Request, res: Response){
        const { uuid } = req.params
        const { skin } = req.body
        if(validator.validateUUID(uuid) && validator.validateString(skin)){
            const update_response = await this.updateConfigsAndSocialOfProfile.execute({
                uuid,
                skin
            })
            if(update_response.isRight()){
                return res.sendStatus(200)
            }
            logError(update_response.value, 'PlayerProfileConfigsController', 'updateSkin', 'updateConfigsAndSocialOfProfile')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    }
    async updateLanguage(req: Request, res: Response){
        const { uuid } = req.params
        const { language } = req.body
        if(validator.validateUUID(uuid) && validateLanguage(language)){
            const update_response = await this.updateConfigsAndSocialOfProfile.execute({
                uuid,
                language
            })
            if(update_response.isRight()){
                return res.sendStatus(200)
            }
            logError(update_response.value, 'PlayerProfileConfigsController', 'updateLanguage', 'UpdateConfigsAndSocialOfProfile')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    }
    async updateFriendInvitePreferences(req: Request, res: Response){
        const { uuid } = req.params
        const { friend_invites_preference } = req.body
        if(validator.validateUUID(uuid) && validator.validateBoolean(friend_invites_preference)){
            const update_response = await this.updateConfigsAndSocialOfProfile.execute({
                uuid,
                friend_invites_preference
            })
            if(update_response.isRight()){
                return res.sendStatus(200)
            }
            logError(update_response.value, 'PlayerProfileConfigsController', 'updateFriendInvitePreferences', 'UpdateConfigsAndSocialOfProfile')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    }
    // SOCIAL
    async updateSocialMedia(req: Request, res: Response){
        const { uuid } = req.params
        const { email, discord, twitch, youtube } = req.body
        if(validator.validateUUID(uuid)){
            const update_response = await this.updateConfigsAndSocialOfProfile.execute({
                uuid,
                email,
                discord,
                twitch,
                youtube
            })
            if(update_response.isRight()){
                return res.sendStatus(200)
            }
            logError(update_response.value, 'PlayerProfileConfigsController', 'updateSocialMedia', 'UpdateConfigsAndSocialOfProfile')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    }
    // ROLE
    async updateRole(req: Request, res: Response){
        const { uuid } = req.params
        const { applicator_uuid, role_id } = req.body
        if(validator.validateUUID(uuid) && validator.validateUUID(applicator_uuid) && typeof(role_id) == 'number' && roles.isRole(role_id)){
            const update_response = await this.updateProfileRole.execute({
                uuid,
                applicator_uuid,
                role_id
            })

            if(update_response.isRight()){
                return res.sendStatus(200)
            }
            logError(update_response.value, 'PlayerProfileConfigsController', 'updateRole', 'UpdateProfileRole')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    }
}

const playerProfileConfigsController = new PlayerProfileConfigsController(
    new UpdateConfigsAndSocialOfProfile(playerProfileRepository),
    new UpdateProfileRole(playerProfileRepository)
)

export default playerProfileConfigsController