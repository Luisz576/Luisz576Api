import { isValidPunishment } from '../../../domain/punishmentType'
import { Request, Response } from 'express'
import { logError } from '../../../domain/errors/errors'
import validator from '../../../services/validator'
import { GivePunishment } from '../../../usecases/punishment/GivePunishment'
import punishmentRepository from '../../../repositories/punishment/PunishmentRepository'
import playerProfileRepository from '../../../repositories/player_profile/PlayerProfileRepository'
import { PardonAllPunishmentsOfPlayer } from '../../../usecases/punishment/PardonAllPunishmentsOfPlayer'
import { GetAllPunishmentsOfPlayer } from '../../../usecases/punishment/GetAllPunishmentsOfPlayer'

class PunishmentsController {
    constructor(
        private givePunishment: GivePunishment,
        private pardonAllPunishmentsOfPlayer: PardonAllPunishmentsOfPlayer,
        private getAllPunishmentsOfPlayer: GetAllPunishmentsOfPlayer
    ){}
    async store(req: Request, res: Response){
        const { uuid, applicator_uuid, punishment_type, reason, duration, comment } = req.body
        if(validator.validateUUID(uuid) && validator.validateUUID(applicator_uuid) && isValidPunishment(punishment_type, duration) && reason){
            const punishment_response = await this.givePunishment.execute({
                applicator_uuid,
                player_uuid: uuid,
                punishment_type,
                reason,
                comment,
                duration
            })
            if(punishment_response.isRight()){
                return res.json({
                    status: 200,
                    uuid,
                    punishment: punishment_response.value
                })
            }
            // TODO fazer tratamento de erro personalizado
            logError(punishment_response.value, 'PunishmentsController', 'store', 'GivePunishment')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    }
    async search(req: Request, res: Response){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            const punishments_response = await this.getAllPunishmentsOfPlayer.execute({
                uuid
            })
            if(punishments_response.isRight()){
                return res.json({
                    status: 200,
                    uuid,
                    punishments: punishments_response.value
                })
            }
            // TODO fazer tratamento de erro personalizado
            logError(punishments_response.value, 'PunishmentsController', 'search', 'GetAllPunishmentsOfPlayer')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    }
    async pardonall(req: Request, res: Response){
        const { uuid } = req.params
        const { applicator_uuid } = req.body
        if(validator.validateUUID(uuid) && validator.validateUUID(applicator_uuid)){
            const pardon_response = await this.pardonAllPunishmentsOfPlayer.execute({
                applicator_uuid,
                player_uuid: uuid
            })
            if(pardon_response.isRight()){
                return res.sendStatus(200)
            }
            // TODO fazer tratamento de erro personalizado
            logError(pardon_response.value, 'PunishmentsController', 'pardonall', 'PardonAllPunishmentsOfPlayer')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    }
}

const punishmentsController = new PunishmentsController(
    new GivePunishment(punishmentRepository, playerProfileRepository),
    new PardonAllPunishmentsOfPlayer(punishmentRepository, playerProfileRepository),
    new GetAllPunishmentsOfPlayer(punishmentRepository, playerProfileRepository)
)

export default punishmentsController