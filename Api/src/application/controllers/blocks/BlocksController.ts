import { getJsonError, logError } from '../../../domain/errors/errors'
import { Request, Response } from 'express'
import validator from '../../../services/validator'
import PlayerProfileRepository from '../../../repositories/player_profile/PlayerProfileRepository'
import BlockListRepository from '../../../repositories/player_profile/BlockListRepository'

export default {
    async search(req: Request, res: Response){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            const profile_response = await PlayerProfileRepository.search({uuid})
            if(profile_response.isRight()){
                if(profile_response.value){
                    // TODO trocar por PlayerProfileRepository.getBlocks(player_profile)
                    //      ou criar um usecase?
                    const blocked_players_response = await profile_response.value.getBlocks()
                    if(blocked_players_response.isRight()){
                        return res.json({
                            status: 200,
                            uuid,
                            blocked_players: blocked_players_response.value
                        })
                    }
                    logError(blocked_players_response.value, 'BlocksController', 'search', 'PlayerProfile.getBlocks')
                    return res.sendStatus(500)
                }
                return res.json(getJsonError(10, { values: {uuid} }))
            }
            logError(profile_response.value, 'BlocksController', 'search', 'PlayerProfileRepository.search')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    },
    async store(req: Request, res: Response){
        const { uuid } = req.params
        const { player_uuid } = req.body
        if(validator.validateUUID(uuid) && validator.validateUUID(player_uuid)){
            const profile_response = await PlayerProfileRepository.search({uuid})
            if(profile_response.isRight()){
                if(profile_response.value){
                    // verify if blocked
                    const is_blocked_response = await profile_response.value.isBlockedByPlayer(player_uuid)
                    if(is_blocked_response.isRight()){
                        if(is_blocked_response.value){
                            return res.json(getJsonError(260, { values: { player_uuid } }))
                        }
                    }else{
                        logError(profile_response.value, 'BlocksController', 'store', 'PlayerProfile.isBlockedByPlayer')
                        return res.sendStatus(500)
                    }
                    //
                    const block_profile_response = await PlayerProfileRepository.search({uuid: player_uuid})
                    if(block_profile_response.isRight()){
                        const block_response = await BlockListRepository.block({
                            block_list_id: profile_response.value.block_list,
                            player_profile: player_uuid
                        })
                        if(block_response.isRight()){
                            return res.sendStatus(200)
                        }
                        logError(profile_response.value, 'BlocksController', 'store', 'BlockListRepository.block')
                        return res.sendStatus(500)
                    }
                    logError(profile_response.value, 'BlocksController', 'store', 'PlayerProfileRepository.search (player_uuid)')
                    return res.sendStatus(500)
                }
                return res.json(getJsonError(10, { values: {uuid} }))
            }
            logError(profile_response.value, 'BlocksController', 'store', 'PlayerProfileRepository.search (uuid)')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    },
    async delete(req: Request, res: Response){
        const { uuid } = req.params
        const { unblock_player } = req.body
        if(validator.validateUUID(uuid) && validator.validateUUID(unblock_player)){
            const profile_response = await PlayerProfileRepository.search({uuid})
            if(profile_response.isRight()){
                if(profile_response.value){
                    // verify if blocked
                    const is_blocked_response = await profile_response.value.isBlockedByPlayer(unblock_player)
                    if(is_blocked_response.isRight()){
                        if(!is_blocked_response.value){
                            return res.json(getJsonError(270, { values: { unblock_player } }))
                        }
                    }else{
                        logError(profile_response.value, 'BlocksController', 'store', 'PlayerProfile.isBlockedByPlayer')
                        return res.sendStatus(500)
                    }
                    //
                    const block_profile_response = await PlayerProfileRepository.search({uuid: unblock_player})
                    if(block_profile_response.isRight()){
                        // unblock
                        const unblock_response = await BlockListRepository.unblock({
                            block_list_id: profile_response.value.block_list,
                            player_profile: unblock_player
                        })
                        if(unblock_response.isRight()){
                            return res.sendStatus(200)
                        }
                        logError(profile_response.value, 'BlocksController', 'delete', 'BlockListRepository.block')
                        return res.sendStatus(500)
                    }
                    logError(profile_response.value, 'BlocksController', 'delete', 'PlayerProfileRepository.search (unblock_player)')
                    return res.sendStatus(500)
                }
                return res.json(getJsonError(10, { values: {uuid} }))
            }
            logError(profile_response.value, 'BlocksController', 'delete', 'PlayerProfileRepository.search (uuid)')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    }
}