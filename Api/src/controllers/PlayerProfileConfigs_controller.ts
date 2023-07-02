import roles from '../domain/roles'
import { validateLanguage } from '../domain/languages'
import { Request, Response } from 'express'
import { getJsonError, logError } from '../errors/errors'
import validator from '../services/validator'
import PlayerProfileRepository from '../repositories/player_profile/PlayerProfileRepository'

export default {
    async updateSkin(req: Request, res: Response){
        const { uuid } = req.params
        const { skin } = req.body
        if(validator.validateUUID(uuid)){
            const update_response = await PlayerProfileRepository.updateConfigsAndSocial({
                uuid,
                skin
            })
            if(update_response.isRight()){
                if(update_response.value){
                    return res.sendStatus(200)
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }
            logError(update_response.value, 'PlayerProfileConfigsController', 'updateSkin', 'PlayerProfileRepository.updateConfigsAndSocial')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    },
    async updateLanguage(req: Request, res: Response){
        const { uuid } = req.params
        const { language } = req.body
        if(validateLanguage(language)){
            const update_response = await PlayerProfileRepository.updateConfigsAndSocial({
                uuid,
                language
            })
            if(update_response.isRight()){
                if(update_response.value){
                    return res.sendStatus(200)
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }
            logError(update_response.value, 'PlayerProfileConfigsController', 'updateLanguage', 'PlayerProfileRepository.updateConfigsAndSocial')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    },
    async updateFriendInvitePreferences(req: Request, res: Response){
        const { uuid } = req.params
        const { friend_invites_preference } = req.body
        if(validator.validateBoolean(friend_invites_preference)){
            const update_response = await PlayerProfileRepository.updateConfigsAndSocial({
                uuid,
                friend_invites_preference
            })
            if(update_response.isRight()){
                if(update_response.value){
                    return res.sendStatus(200)
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }
            logError(update_response.value, 'PlayerProfileConfigsController', 'updateFriendInvitePreferences', 'PlayerProfileRepository.updateConfigsAndSocial')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    },
    // SOCIAL
    async updateSocialMedia(req: Request, res: Response){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            const { email, discord, twitch, youtube } = req.body
            const update_response = await PlayerProfileRepository.updateConfigsAndSocial({
                uuid,
                email,
                discord,
                twitch,
                youtube
            })
            if(update_response.isRight()){
                if(update_response.value){
                    return res.sendStatus(200)
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }
            logError(update_response.value, 'PlayerProfileConfigsController', 'updateSocialMedia', 'PlayerProfileRepository.updateConfigsAndSocial')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    },
    // ROLE
    async updateRole(req: Request, res: Response){
        const { uuid } = req.params
        const { applicator_uuid, role_id } = req.body
        if(validator.validateUUID(uuid) && validator.validateUUID(applicator_uuid) && typeof(role_id) == 'number' && roles.isRole(role_id)){
            const profile_response = await PlayerProfileRepository.search({uuid})
            if(profile_response.isRight()){
                const profile = profile_response.value
                if(profile){
                    const applicator_profile_response = await PlayerProfileRepository.search({
                        uuid: applicator_uuid
                    })
                    if(applicator_profile_response.isRight()){
                        const applicator_profile = applicator_profile_response.value
                        if(applicator_profile){
                            if(roles.isAdmin(applicator_profile.role)){
                                const update_response = await PlayerProfileRepository.updateRole({
                                    player_profile: profile,
                                    role: role_id
                                })
                                if(update_response.isRight()){
                                    return res.sendStatus(200)
                                }
                                logError(update_response.value, 'PlayerProfileConfigsController', 'updateRole', 'PlayerProfileRepository.updateRole')
                                return res.sendStatus(500)
                            }
                            return res.json(getJsonError(210))
                        }
                        return res.json(getJsonError(15, {
                            values: {
                                "uuid_target": applicator_uuid
                            },
                        }))
                    }
                    logError(applicator_profile_response.value, 'PlayerProfileConfigsController', 'updateRole', 'PlayerProfileRepository.search')
                    return res.sendStatus(500)
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }
            logError(profile_response.value, 'PlayerProfileConfigsController', 'updateRole', 'PlayerProfileRepository.search')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    },
}