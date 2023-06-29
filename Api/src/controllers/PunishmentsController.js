const { isAdmin } = require("../domain/Roles")
const { getJsonError, logError } = require('../errors/errors')
const PunishmentRepository = require("../repositories/punishments/PunishmentRepository")
const validator = require("../services/validator")

module.exports = {
    async store(req, res){
        const { uuid, applicator_uuid, punishment_type, reason, duration, comment } = req.body
        if(validator.validateUUID(uuid) && validator.validateUUID(applicator_uuid) && validator.validatePunishmentAndDuration(punishment_type, duration) && reason){
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
                            //TODO validar se ja nao tem essa punição
                            const punishment = await PunishmentRepository.givePunishment({
                                player_profile: profile,
                                applicator_profile_uuid: applicator_profile.uuid,
                                punishment_type,
                                reason,
                                duration,
                                comment
                            })
                            return res.sendStatus({
                                status: 200,
                                uuid,
                                punishment
                            })
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
    async search(req, res){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            try{
                const profile = await PlayerProfileRepository.search({
                    uuid
                })
                if(profile){
                    const punishments = await PunishmentRepository.search({
                        player_profile_uuid: profile.uuid
                    })
                    return res.json({
                        "status": 200,
                        uuid,
                        punishments
                    })
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }catch(e){
                logError(e, 'PunishmentsController', 'search')
                return res.sendStatus(500)
            }
        }
        return res.sendStatus(400)
    },
    async pardon(req, res){
        const { uuid } = req.params
        const { applicator_uuid, punishment_id } = req.body
        if(validator.validateUUID(uuid) && validator.validateUUID(applicator_uuid) && punishment_id){
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
                            await PunishmentRepository.pardon({
                                punishment_id
                            })
                            return res.sendStatus(200)
                        }
                        return res.json(getJsonError(210))
                    }
                    return res.json(getJsonError(15, {values: {
                        "uuid_target": applicator_uuid
                    }}))
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }catch(e){
                logError(e, 'PunishmentsController', 'pardonall')
                return res.sendStatus(500)
            }
        }
        return res.sendStatus(501)
    },
    async pardonall(req, res){
        const { uuid } = req.params
        const { applicator_uuid } = req.body
        if(validator.validateUUID(uuid) && validator.validateUUID(applicator_uuid)){
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
                            await PunishmentRepository.pardonAll({player_profile_uuid: profile.uuid})
                            return res.sendStatus(200)
                        }
                        return res.json(getJsonError(210))
                    }
                    return res.json(getJsonError(15, {values: {
                        "uuid_target": applicator_uuid
                    }}))
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }catch(e){
                logError(e, 'PunishmentsController', 'pardonall')
                return res.sendStatus(500)
            }
        }
        return res.sendStatus(501)
    }
}