const { isAdmin, isRole } = require('../domain/Roles')
const { getJsonError, logError } = require('../errors/errors')
const PlayerProfileRepository = require('../repositories/player_profile/PlayerProfileRepository')
const validator = require('../services/validator')

module.exports = {
    async updateSkin(req, res){
        const { uuid } = req.params
        const { skin } = req.body
        if(validator.validateUUID(uuid)){
            try{
                const profile = await PlayerProfileRepository.updateConfigsAndSocial({
                    player_profile_uuid: uuid,
                    skin
                })
                if(profile){
                    return res.sendStatus(200)
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }catch(e){
                logError(e, 'PlayerProfileConfigsController', 'uploadSkin')
                return res.sendStatus(500)
            }
        }
        return res.sendStatus(400)
    },
    async updateLanguage(req, res){
        const { uuid } = req.params
        const { language } = req.body
        if(validator.validateLanguage(language)){
            try{
                const profile = await PlayerProfileRepository.updateConfigsAndSocial({
                    friend_invites_prefference: uuid,
                    language
                })
                if(profile){
                    return res.sendStatus(200)
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }catch(e){
                logError(e, 'PlayerProfileConfigsController', 'uploadLanguage')
                return res.sendStatus(500)
            }
        }
        return res.sendStatus(400)
    },
    async updateFriendInvitePrefferences(req, res){
        const { uuid } = req.params
        const { friend_invites_prefference } = req.body
        if(validator.validateBoolean(friend_invites_prefference)){
            try{
                const profile = await PlayerProfileRepository.updateConfigsAndSocial({
                    player_profile_uuid: uuid,
                    friend_invites_prefference
                })
                if(profile){
                    return res.sendStatus(200)
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }catch(e){
                logError(e, 'PlayerProfileConfigsController', 'updateFriendInvitePrefferences')
                return res.sendStatus(500)
            }
        }
        return res.sendStatus(400)
    },
    // SOCIAL
    async updateSocialMedia(req, res){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            const { email, discord, twitch, youtube } = req.body
            try{
                const profile = await PlayerProfileRepository.updateConfigsAndSocial({
                    player_profile_uuid: uuid,
                    email, discord, twitch, youtube
                })
                if(profile){
                    return res.sendStatus(200)
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }catch(e){
                logError(e, 'PlayerProfileConfigsController', 'updateSocialMedia')
                return res.sendStatus(500)
            }
        }
        return res.sendStatus(400)
    },
    // ROLE
    async updateRole(req, res){
        const { uuid } = req.params
        const { applicator_uuid, role_id } = req.body
        if(validator.validateUUID(uuid) && validator.validateUUID(applicator_uuid) && isRole(role_id)){
            try{
                const profile = await PlayerProfileRepository.search({
                    uuid
                })
                if(profile){
                    const applicator_profile = await PlayerProfileRepository.search({
                        uuid: applicator_uuid
                    })
                    if(applicator_profile){
                        if(isAdmin(applicator_profile.role)){
                            await PlayerProfileRepository.updateRole({
                                player_profile: profile,
                                role
                            })
                            return res.sendStatus(200)  
                        }
                        return res.json(getJsonError(210))
                    }
                    return res.json(getJsonError(15, {
                        values: {
                            "uuid_target": applicator_uuid
                        },
                    }))
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }catch(e){
                logError(e, 'PlayerProfileConfigsController', 'uploadRole')
                return res.sendStatus(500)
            }
        }
        return res.sendStatus(400)
    },
}