const { isAdmin } = require("../domain/Roles")
const { getJsonError, logError } = require('../errors/errors')
const PlayerProfile = require("../models/player_profile/PlayerProfile")
const punishment = require("../models/punishments/punishment")
const validator = require("../services/validator")

module.exports = {
    async searsh(req, res){
        const { uuid } = req.params
        try{
            const profile = await PlayerProfile.findOne({uuid})
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
        }catch(e){
            logError(e)
            return res.sendStatus(500)
        }
        return res.json(getJsonError(10, {values: { uuid }}))
    },
    async store(req, res){
        const { uuid, applicator_uuid, punishment_type, reason, duration, comment } = req.body
        if(validator.validateUUID(uuid) && validator.validateUUID(applicator_uuid) && validator.validatePunishmentAndDuration(punishment_type, duration) && reason){
            try{
                const profile = await PlayerProfile.findOne({uuid})
                if(profile){
                    const applicator_profile = await PlayerProfile.findOne({uuid: applicator_uuid})
                    if(applicator_profile){
                        if(isAdmin(applicator_profile.role)){
                            //TODO validar se ja nao tem essa punição
                            profile.punishment = true
                            await punishment.create({
                                player_profile: profile,
                                applicator_profile,
                                punishment_type,
                                duration,
                                reason,
                                comment
                            })
                            await profile.save()
                            return res.sendStatus(201)
                        }
                        return res.json(getJsonError(210))
                    }
                    return res.json(getJsonError(15, {values: {
                        "uuid_target": applicator_uuid
                    }}))
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }catch(e){
                logError(e)
                return res.sendStatus(500)
            }
        }
        return res.sendStatus(400)
    },
    async removeall(req, res){
        //TODO
        return res.sendStatus(501)
    }
}