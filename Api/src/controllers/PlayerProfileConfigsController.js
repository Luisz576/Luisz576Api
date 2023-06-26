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
    }
}