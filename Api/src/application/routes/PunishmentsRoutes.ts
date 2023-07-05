import {Router} from 'express'

import AuthenticatorMiddleware from '../middlewares/AuthenticatorMiddleware'
import PunishmentsController from '../controllers/punishments/PunishmentsController'
import GivePunishment from '../../usecases/punishment/GivePunishment'
import PardonAllPunishmentsOfPlayer from '../../usecases/punishment/PardonAllPunishmentsOfPlayer'
import GetAllPunishmentsOfPlayer from '../../usecases/punishment/GetAllPunishmentsOfPlayer'
import punishmentRepository from '../../repositories/punishment/PunishmentRepository'
import playerProfileRepository from '../../repositories/player_profile/PlayerProfileRepository'

const routes = Router()

routes.use(AuthenticatorMiddleware)

// <Punishments>
const punishmentsController = new PunishmentsController(
    new GivePunishment(punishmentRepository, playerProfileRepository),
    new PardonAllPunishmentsOfPlayer(punishmentRepository, playerProfileRepository),
    new GetAllPunishmentsOfPlayer(punishmentRepository, playerProfileRepository)
)
routes.get('/:uuid', punishmentsController.search)
routes.post('/give', punishmentsController.store)
routes.delete('/:uuid/pardonall', punishmentsController.pardonall)

export default routes