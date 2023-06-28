const { isAdmin } = require("../domain/Roles")
const { getJsonError, logError } = require('../errors/errors')
const PlayerProfile = require("../models/player_profile/PlayerProfile")
const PunishmentRepository = require("../repositories/punishments/PunishmentRepository")
const validator = require("../services/validator")

module.exports = {
    async store(req, res){
        const { uuid, applicator_uuid, punishment_type, reason, duration, comment } = req.body
        if(validator.validateUUID(uuid) && validator.validateUUID(applicator_uuid) && validator.validatePunishmentAndDuration(punishment_type, duration) && reason){
            try{
                const profile = await PlayerProfile.findOne({uuid})
                if(profile){
                    const applicator_profile = await PlayerProfile.findOne({uuid: applicator_uuid})
                    if(applicator_profile){
                        if(isAdmin(applicator_profile.role)){
                            await PunishmentRepository.givePunishment({
                                player_profile: profile,
                                applicator_profile_uuid: applicator_profile.uuid,
                                punishment_type,
                                reason,
                                duration,
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
            }catch(e){
                logError(e, 'PunishmentsController', 'store')
                return res.sendStatus(500)
            }
        }
        return res.sendStatus(400)
    },
    async searsh(req, res){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            try{
                const profile = await PlayerProfile.findOne({uuid})
                if(profile){
                    const punishments = await PunishmentRepository.searsh({
                        player_profile_uuid: profile.uuid
                    })
                    return res.json({
                        "status": 200,
                        uuid,
                        punishments
                    })
                }
            }catch(e){
                logError(e, 'PunishmentsController', 'searsh')
                return res.sendStatus(500)
            }
            return res.json(getJsonError(10, {values: { uuid }}))
        }
        return res.sendStatus(400)
    },
    async pardonall(req, res){
        //TODO pardonall
        return res.sendStatus(501)
    }
}