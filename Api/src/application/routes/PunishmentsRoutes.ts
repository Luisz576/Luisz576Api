import {Router} from 'express'

import AuthenticatorMiddleware from '../middlewares/AuthenticatorMiddleware'
import PunishmentsController from '../controllers/punishments/PunishmentsController'
import GivePunishment from '../../usecases/punishment/GivePunishment'
import PardonAllPunishmentsOfPlayer from '../../usecases/punishment/PardonAllPunishmentsOfPlayer'
import GetAllPunishmentsOfPlayer from '../../usecases/punishment/GetAllPunishmentsOfPlayer'
import punishmentRepository from '../../repositories/punishment/PunishmentRepository'
import playerProfileRepository from '../../repositories/player_profile/PlayerProfileRepository'
import ExpressAdapter from '../../domain/adapters/ExpressAdapter'

const routes = Router()

// middleware
const authenticatorMiddleware = new AuthenticatorMiddleware()
routes.use((req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return authenticatorMiddleware.auth(adapter)
})

// <Punishments>
const punishmentsController = new PunishmentsController(
    new GivePunishment(punishmentRepository, playerProfileRepository),
    new PardonAllPunishmentsOfPlayer(punishmentRepository, playerProfileRepository),
    new GetAllPunishmentsOfPlayer(punishmentRepository, playerProfileRepository)
)
routes.get('/:uuid', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return punishmentsController.search(adapter)
})
routes.post('/give', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return punishmentsController.store(adapter)
})
routes.delete('/:uuid/pardonall', (req, res, next) => {
    const adapter = new ExpressAdapter(req, res, next)
    return punishmentsController.pardonall(adapter)
})

export default routes