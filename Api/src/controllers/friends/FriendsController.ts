import { Request, Response } from 'express'
import validator from '../../services/validator'
import PlayerProfileRepository from '../../repositories/player_profile/PlayerProfileRepository'
import FriendsListRepository from '../../repositories/friends/FriendsListRepository'
import { getJsonError, logError } from '../../errors/errors'

export default {
    async search(req: Request, res: Response){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            const profile_response = await PlayerProfileRepository.search({
                uuid
            })
            if(profile_response.isRight()){
                const profile = profile_response.value
                if(profile){
                    const friends_response = await profile.getFriends()
                    if(friends_response.isRight()){
                        return res.json({
                            "status": 200,
                            uuid,
                            friends: friends_response.value
                        })
                    }
                    logError(profile_response.value, 'FriendsController', 'search', 'PlayerProfile.getFriends')
                    return res.sendStatus(500)
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }
            logError(profile_response.value, 'FriendsController', 'search', 'PlayerProfileRepository.search')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    },
    async remove(req: Request, res: Response){
        const { uuid } = req.params
        const { friend_uuid } = req.body
        if(validator.validateUUID(uuid) && validator.validateUUID(friend_uuid)){
            const profile_response = await PlayerProfileRepository.search({
                uuid
            })
            if(profile_response.isRight()){
                const profile = profile_response.value
                if(profile){
                    const friend_profile_response = await PlayerProfileRepository.search({
                        uuid: friend_uuid
                    })
                    if(friend_profile_response.isRight()){
                        const friend_profile = friend_profile_response.value
                        if(friend_profile){
                            const are_friends_response = await profile.areFriends(friend_profile.uuid)
                            if(are_friends_response.isRight()){
                                if(are_friends_response.value){
                                    // remove in profile
                                    const remove_in_profile_response = await FriendsListRepository.removeFriend({
                                        friends_list_id: friend_profile.friends_list,
                                        player_profile_uuid: profile.uuid
                                    })
                                    if(remove_in_profile_response.isLeft()){
                                        logError(remove_in_profile_response.value, 'FriendsController', 'remove', 'FriendsListRepository.removeFriend')
                                        return res.sendStatus(500)
                                    }
                                    // remove in other profile
                                    const remove_in_friend_response = await FriendsListRepository.removeFriend({
                                        friends_list_id: profile.friends_list,
                                        player_profile_uuid: friend_profile.uuid
                                    })
                                    if(remove_in_friend_response.isLeft()){
                                        logError(remove_in_friend_response.value, 'FriendsController', 'remove', 'FriendsListRepository.removeFriend')
                                        return res.sendStatus(500)
                                    }
                                    return res.sendStatus(200)
                                }
                                return res.json(getJsonError(117))
                            }
                            logError(friend_profile_response.value, 'FriendsController', 'remove', 'PlayerProfile.areFriends')
                            return res.sendStatus(500)
                        }
                        return res.json(getJsonError(15, {
                            values: {
                                "uuid_target": friend_uuid
                            },
                        }))
                    }
                    logError(friend_profile_response.value, 'FriendsController', 'remove', 'PlayerProfileRepository.search')
                    return res.sendStatus(500)
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }
            logError(profile_response.value, 'FriendsController', 'remove', 'PlayerProfileRepository.search')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    }
}