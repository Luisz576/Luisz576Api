const { isAdmin } = require("../domain/Roles")
const { getJsonError } = require('../errors/errors')
const PlayerProfile = require("../models/player_profile/PlayerProfile")
const punishment = require("../models/punishments/punishment")
const { validatePunishmentAndDuration } = require("../services/validator")

module.exports = {
    async searsh(req, res){
        const { uuid } = req.params
        let profile = await PlayerProfile.findOne({uuid})
        if(profile){
            if(profile.punishment){
                const punishments = await profile.getPunishments()
                return res.json({
                    "status": 200,
                    uuid,
                    punishments
                })
            }
            return res.json({
                "status": 200,
                "punishments": []
            })
        }
        return res.json(getJsonError(10, {values: { uuid }}))
    },
    async store(req, res){
        const { uuid, applicator_uuid, punishment_type, reason, duration, comment } = req.body
        if(uuid && applicator_uuid && validatePunishmentAndDuration(punishment_type, duration) && reason){
            let profile = await PlayerProfile.findOne({uuid})
            if(profile){
                let applicator_profile = await PlayerProfile.findOne({uuid: applicator_uuid})
                if(applicator_profile){
                    if(isAdmin(applicator_profile.role)){
                        await punishment.create({
                            player_profile: profile,
                            applicator_profile,
                            punishment_type,
                            duration,
                            reason,
                            comment
                        })
                        return res.sendStatus(201)
                    }
                    return res.json(getJsonError(210))
                }
                return res.json(getJsonError(15, {values: {
                    "uuid_target": applicator_uuid
                }}))
            }
            return res.json(getJsonError(10, {values: { uuid }}))
        }
        return res.sendStatus(400)
    },
    async removeall(req, res){
        //TODO
        return res.sendStatus(501)
    }
}