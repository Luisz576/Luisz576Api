import { logError } from '../../../domain/errors/errors'
import validator from '../../../services/validator'
import BlockPlayerProfile from '../../../usecases/player_profile/BlockPlayerProfile'
import UnblockPlayerProfile from '../../../usecases/player_profile/UnblockPlayerProfile'
import GetBlockedPlayersOfPlayerProfile from '../../../usecases/player_profile/GetBlockedPlayersOfPlayerProfile'
import IHttpContext from '../../../domain/interfaces/IHttpContext'

export default class BlocksController {
    constructor(
        private blockPlayerProfile: BlockPlayerProfile,
        private unblockPlayerProfile: UnblockPlayerProfile,
        private getBlockedPlayersOfPlayerProfile: GetBlockedPlayersOfPlayerProfile
    ){}
    async search(httpContext: IHttpContext){
        const { uuid } = httpContext.getRequest().params
        if(validator.validateUUID(uuid)){
            const search_response = await this.getBlockedPlayersOfPlayerProfile.execute({
                uuid
            })
            if(search_response.isRight()){
                return httpContext.getResponse().json({
                    status: 200,
                    uuid,
                    blocked_players: search_response.value
                })
            }
            logError(search_response.value, 'BlocksController', 'search', '')
            return httpContext.getResponse().sendStatus(500)
        }
        return httpContext.getResponse().sendStatus(400)
    }
    async store(httpContext: IHttpContext){
        const { uuid } = httpContext.getRequest().params
        const { player_uuid } = httpContext.getRequest().body
        if(validator.validateUUID(uuid) && validator.validateUUID(player_uuid)){
            const block_response = await this.blockPlayerProfile.execute({
                uuid,
                uuid_to_block: player_uuid
            })
            if(block_response.isRight()){
                return httpContext.getResponse().sendStatus(200)
            }
            logError(block_response.value, 'BlocksController', 'store', 'BlockPlayerProfile')
            return httpContext.getResponse().sendStatus(500)
        }
        return httpContext.getResponse().sendStatus(400)
    }
    async delete(httpContext: IHttpContext){
        const { uuid } = httpContext.getRequest().params
        const { unblock_player } = httpContext.getRequest().body
        if(validator.validateUUID(uuid) && validator.validateUUID(unblock_player)){
            const unblock_response = await this.unblockPlayerProfile.execute({
                uuid,
                uuid_to_unblock: unblock_player
            })
            if(unblock_response.isRight()){
                return httpContext.getResponse().sendStatus(200)
            }
            logError(unblock_response.value, 'BlocksController', 'delete', 'UnblockPlayerProfile')
            return httpContext.getResponse().sendStatus(500)
        }
        return httpContext.getResponse().sendStatus(400)
    }
}