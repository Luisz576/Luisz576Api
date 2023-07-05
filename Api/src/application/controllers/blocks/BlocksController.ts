import { logError } from '../../../domain/errors/errors'
import validator from '../../../services/validator'
import BlockPlayerProfile from '../../../usecases/player_profile/BlockPlayerProfile'
import UnblockPlayerProfile from '../../../usecases/player_profile/UnblockPlayerProfile'
import GetBlockedPlayersOfPlayerProfile from '../../../usecases/player_profile/GetBlockedPlayersOfPlayerProfile'
import IRequest from '../../../domain/adapters/IRequest'
import IResponse from '../../../domain/adapters/IResponse'

export default class BlocksController {
    constructor(
        private blockPlayerProfile: BlockPlayerProfile,
        private unblockPlayerProfile: UnblockPlayerProfile,
        private getBlockedPlayersOfPlayerProfile: GetBlockedPlayersOfPlayerProfile
    ){}
    async search(req: IRequest, res: IResponse){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            const search_response = await this.getBlockedPlayersOfPlayerProfile.execute({
                uuid
            })
            if(search_response.isRight()){
                return res.json({
                    status: 200,
                    uuid,
                    blocked_players: search_response.value
                })
            }
            logError(search_response.value, 'BlocksController', 'search', '')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    }
    async store(req: IRequest, res: IResponse){
        const { uuid } = req.params
        const { player_uuid } = req.body
        if(validator.validateUUID(uuid) && validator.validateUUID(player_uuid)){
            const block_response = await this.blockPlayerProfile.execute({
                uuid,
                uuid_to_block: player_uuid
            })
            if(block_response.isRight()){
                return res.sendStatus(200)
            }
            logError(block_response.value, 'BlocksController', 'store', 'BlockPlayerProfile')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    }
    async delete(req: IRequest, res: IResponse){
        const { uuid } = req.params
        const { unblock_player } = req.body
        if(validator.validateUUID(uuid) && validator.validateUUID(unblock_player)){
            const unblock_response = await this.unblockPlayerProfile.execute({
                uuid,
                uuid_to_unblock: unblock_player
            })
            if(unblock_response.isRight()){
                return res.sendStatus(200)
            }
            logError(unblock_response.value, 'BlocksController', 'delete', 'UnblockPlayerProfile')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    }
}