const { getJsonError } = require('../domain/errors/errors')
const PlayerProfile = require('../models/player_profile/PlayerProfile')
const { validateLanguage } = require('../services/validator')

module.exports = {
    async updateSkin(req, res){
        const { uuid } = req.params
        const { skin } = req.body
        if(uuid){
            let profile = await PlayerProfile.findOne({ uuid })
            if(profile){
                profile.skin = skin
                await profile.save()
                return res.sendStatus(200)
            }
            return res.json(getJsonError(10, {values: { uuid }}))
        }
        return res.sendStatus(400)
    },
    async updateLanguage(req, res){
        const { uuid } = req.params
        const { language } = req.body
        if(uuid && validateLanguage(language)){
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
        if(uuid && friend_invite_prefference != undefined){
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