import { isValidPunishment } from '../../../domain/punishmentType'
import { logError } from '../../../domain/errors/errors'
import validator from '../../../services/validator'
import GivePunishment from '../../../usecases/punishment/GivePunishment'
import PardonAllPunishmentsOfPlayer from '../../../usecases/punishment/PardonAllPunishmentsOfPlayer'
import GetAllPunishmentsOfPlayer from '../../../usecases/punishment/GetAllPunishmentsOfPlayer'
import IHttpContext from '../../../domain/interfaces/IHttpContext'
import { ErrorType } from '../../../domain/errors/error_type'

export default class PunishmentsController {
    constructor(
        private givePunishment: GivePunishment,
        private pardonAllPunishmentsOfPlayer: PardonAllPunishmentsOfPlayer,
        private getAllPunishmentsOfPlayer: GetAllPunishmentsOfPlayer
    ){}
    async store(httpContext: IHttpContext){
        const { uuid, applicator_uuid, punishment_type, reason, duration, comment } = httpContext.getRequest().body
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
                return httpContext.getResponse().json({
                    status: 200,
                    uuid,
                    punishment: punishment_response.value
                })
            }
            if(punishment_response.value.id == ErrorType.generic){
                logError(punishment_response.value, 'PunishmentsController.store', 'GivePunishment')
                return httpContext.getResponse().sendStatus(500)
            }
            return httpContext.getResponse().json(punishment_response.value.toJson({
                uuid, applicator_uuid, punishment_type, reason, duration, comment
            }))
        }
        return httpContext.getResponse().sendStatus(400)
    }
    async search(httpContext: IHttpContext){
        const { uuid } = httpContext.getRequest().params
        if(validator.validateUUID(uuid)){
            const punishments_response = await this.getAllPunishmentsOfPlayer.execute({
                uuid
            })
            if(punishments_response.isRight()){
                return httpContext.getResponse().json({
                    status: 200,
                    uuid,
                    punishments: punishments_response.value
                })
            }
            // TODO fazer tratamento de erro personalizado
            logError(punishments_response.value, 'PunishmentsController', 'search', 'GetAllPunishmentsOfPlayer')
            return httpContext.getResponse().sendStatus(500)
        }
        return httpContext.getResponse().sendStatus(400)
    }
    async pardonall(httpContext: IHttpContext){
        const { uuid } = httpContext.getRequest().params
        const { applicator_uuid } = httpContext.getRequest().body
        if(validator.validateUUID(uuid) && validator.validateUUID(applicator_uuid)){
            const pardon_response = await this.pardonAllPunishmentsOfPlayer.execute({
                applicator_uuid,
                player_uuid: uuid
            })
            if(pardon_response.isRight()){
                return httpContext.getResponse().sendStatus(200)
            }
            // TODO fazer tratamento de erro personalizado
            logError(pardon_response.value, 'PunishmentsController', 'pardonall', 'PardonAllPunishmentsOfPlayer')
            return httpContext.getResponse().sendStatus(500)
        }
        return httpContext.getResponse().sendStatus(400)
    }
}