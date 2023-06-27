const { isRole, isAdmin } = require('../domain/Roles')
const { getJsonError } = require('../errors/errors')
const PlayerProfile = require('../models/player_profile/PlayerProfile')
const { validateLanguage, validateFriendInvitePrefference } = require('../services/validator')

module.exports = {
    async updateSkin(req, res){
        const { uuid } = req.params
        const { skin } = req.body
        let profile = await PlayerProfile.findOne({ uuid })
        if(profile){
            profile.skin = skin
            await profile.save()
            return res.sendStatus(200)
        }
        return res.json(getJsonError(10, {values: { uuid }}))
    },
    async updateRole(req, res){
        const { uuid } = req.params
        const { applicator_uuid, role_id } = req.body
        if(applicator_uuid && isRole(role_id)){
            let profile = await PlayerProfile.findOne({ uuid })
            if(profile){
                let applicator_profile = await PlayerProfile.findOne({ uuid: applicator_uuid })
                if(applicator_profile){
                    if(isAdmin(applicator_profile.role)){
                        profile.role = role_id
                        await profile.save()
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
        }
        return res.sendStatus(400)
    },
    async updateLanguage(req, res){
        const { uuid } = req.params
        const { language } = req.body
        if(validateLanguage(language)){
            let profile = await PlayerProfile.findOne({ uuid })
            if(profile){
                profile.language = language
                await profile.save()
                return res.sendStatus(200)
            }
            return res.json(getJsonError(10, {values: { uuid }}))
        }
        return res.sendStatus(400)
    },
    async updateFriendInvitePrefferences(req, res){
        const { uuid } = req.params
        const { friend_invite_prefference } = req.body
        if(validateFriendInvitePrefference(friend_invite_prefference)){
            let profile = await PlayerProfile.findOne({ uuid })
            if(profile){
                // TODO se decidir manter os ids ao inves de ativo e nao ativo, criar um validador
                profile.friend_invites_prefference = friend_invite_prefference
                await profile.save()
                return res.sendStatus(200)
            }
            return res.json(getJsonError(10, {values: { uuid }}))
        }
        return res.sendStatus(400)
    },
}