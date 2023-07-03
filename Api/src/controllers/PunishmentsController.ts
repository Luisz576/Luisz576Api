import roles from '../domain/roles'
import { isValidPunishment } from '../domain/punishmentType'
import { Request, Response } from 'express'
import { getJsonError, logError } from '../errors/errors'
import validator from '../services/validator'
import PlayerProfileRepository from '../repositories/player_profile/PlayerProfileRepository'
import PunishmentRepository from '../repositories/punishment/PunishmentRepository'

export default {
    async store(req: Request, res: Response){
        const { uuid, applicator_uuid, punishment_type, reason, duration, comment } = req.body
        if(validator.validateUUID(uuid) && validator.validateUUID(applicator_uuid) && isValidPunishment(punishment_type, duration) && reason){
            const profile_response = await PlayerProfileRepository.search({uuid})
            if(profile_response.isRight()){
                if(profile_response.value){
                    const applicator_profile_response = await PlayerProfileRepository.search({
                        uuid: applicator_uuid
                    })
                    if(applicator_profile_response.isRight()){
                        const applicator_profile = applicator_profile_response.value
                        if(applicator_profile){
                            if(roles.isAdmin(applicator_profile.role)){
                                const punishment_response = await PunishmentRepository.store({
                                    player_profile: profile_response.value,
                                    applicator_uuid: applicator_profile.uuid,
                                    punishment_type,
                                    reason,
                                    duration,
                                    comment
                                })
                                if(punishment_response.isRight()){
                                    return res.json({
                                        status: 200,
                                        uuid,
                                        punishment: punishment_response.value
                                    })
                                }
                                logError(applicator_profile_response.value, 'PunishmentsController', 'store', 'PunishmentRepository.store')
                                return res.sendStatus(500)
                            }
                            return res.json(getJsonError(210))
                        }
                        return res.json(getJsonError(15, {values: {
                            "uuid_target": applicator_uuid
                        }}))
                    }
                    logError(applicator_profile_response.value, 'PunishmentsController', 'store', 'PlayerProfileRepository.search')
                    return res.sendStatus(500)
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }
            logError(profile_response.value, 'PunishmentsController', 'store', 'PlayerProfileRepository.search')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    },
    async search(req: Request, res: Response){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            const profile_response = await PlayerProfileRepository.search({uuid})
            if(profile_response.isRight()){
                if(profile_response.value){
                    const punishments_response = await PunishmentRepository.search({
                        player_uuid: uuid
                    })
                    if(punishments_response.isRight()){
                        return res.json({
                            "status": 200,
                            uuid,
                            punishments: punishments_response.value
                        })
                    }
                    logError(profile_response.value, 'PunishmentsController', 'search', 'PunishmentRepository.search')
                    return res.sendStatus(500)
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }
        }
        return res.sendStatus(400)
    },
    async pardon(req: Request, res: Response){
        const { uuid } = req.params
        const { applicator_uuid, punishment_id } = req.body
        if(validator.validateUUID(uuid) && validator.validateUUID(applicator_uuid) && punishment_id){
            const profile_response = await PlayerProfileRepository.search({uuid})
            if(profile_response.isRight()){
                if(profile_response.value){
                    const applicator_profile_response = await PlayerProfileRepository.search({
                        uuid: applicator_uuid
                    })
                    if(applicator_profile_response.isRight()){
                        const applicator_profile = applicator_profile_response.value
                        if(applicator_profile){
                            if(roles.isAdmin(applicator_profile.role)){
                                const pardon_response = await PunishmentRepository.pardon({
                                    punishment_id
                                })
                                if(pardon_response.isRight()){
                                    return res.sendStatus(200)
                                }
                                logError(applicator_profile_response.value, 'PunishmentsController', 'pardon', 'PunishmentRepository.pardon')
                                return res.sendStatus(500)
                            }
                            return res.json(getJsonError(210))
                        }
                        return res.json(getJsonError(15, {values: {
                            "uuid_target": applicator_uuid
                        }}))
                    }
                    logError(applicator_profile_response.value, 'PunishmentsController', 'pardon', 'PlayerProfileRepository.search')
                    return res.sendStatus(500)
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }
            logError(profile_response.value, 'PunishmentsController', 'pardon', 'PlayerProfileRepository.search')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    },
    async pardonall(req: Request, res: Response){
        const { uuid } = req.params
        const { applicator_uuid } = req.body
        if(validator.validateUUID(uuid) && validator.validateUUID(applicator_uuid)){
            const profile_response = await PlayerProfileRepository.search({
                uuid
            })
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
                                const pardon_response = await PunishmentRepository.pardonAllOfPlayer(profile.uuid)
                                if(pardon_response.isRight()){
                                    return res.sendStatus(200)
                                }
                                logError(pardon_response.value, 'PunishmentsController', 'pardonall', 'PunishmentRepository.pardonAllOfPlayer')
                                return res.sendStatus(500)
                            }
                            return res.json(getJsonError(210))
                        }
                        return res.json(getJsonError(15, {values: {
                            "uuid_target": applicator_uuid
                        }}))
                    }
                    logError(applicator_profile_response.value, 'PunishmentsController', 'pardonall', 'PlayerProfileRepository.search')
                    return res.sendStatus(500)
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }
            logError(profile_response.value, 'PunishmentsController', 'pardonall', 'PlayerProfileRepository.search')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    }
}