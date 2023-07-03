import { getJsonError, logError } from '../../errors/errors'
import { Request, Response } from 'express'
import validator from '../../services/validator'
import FriendInviteRepository from '../../repositories/friends/FriendInviteRepository'
import PlayerProfileRepository from '../../repositories/player_profile/PlayerProfileRepository'
import FriendsListRepository from '../../repositories/friends/FriendsListRepository'

export default {
    async search(req: Request, res: Response){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            const friend_invites_response = await FriendInviteRepository.searchAll({
                receiver: uuid
            })
            if(friend_invites_response.isRight()){
                return res.json({
                    status: "200",
                    uuid,
                    friend_invites: friend_invites_response.value
                })
            }
            logError(friend_invites_response.value, 'FriendInvitesController', 'search', 'FriendInviteRepository.searchAll')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    },
    async store(req: Request, res: Response){
        const { new_friend_uuid } = req.body
        const { uuid } = req.params
        if(validator.validateUUID(uuid) && validator.validateUUID(new_friend_uuid)){
            const profile_response = await PlayerProfileRepository.search({
                uuid
            })
            if(profile_response.isRight()){
                const profile = profile_response.value
                if(profile){
                    const friend_profile_response = await PlayerProfileRepository.search({
                        uuid: new_friend_uuid
                    })
                    if(friend_profile_response.isRight()){
                        const friendProfile = friend_profile_response.value
                        if(friendProfile){
                            // ve se ja nao sao amigos
                            const are_friends_response = await profile.areFriends(friendProfile.uuid)
                            if(are_friends_response.isRight()){
                                if(are_friends_response.value){
                                    return res.json(getJsonError(115))
                                }
                            }else{
                                logError(are_friends_response.value, 'FriendInvitesController', 'store', 'PlayerProfile.areFriends')
                                return res.sendStatus(500)
                            }
                            // ve se esta com os pedidos de amizade ativos
                            if(friendProfile.friend_invites_preference){
                                // ver se ja nao tem um convite ativo
                                const valid_friend_invite_response = await FriendInviteRepository.searchOne({
                                    sender: uuid,
                                    receiver: friendProfile.uuid,
                                    valid_invite: true,
                                    accepted: false
                                })
                                if(valid_friend_invite_response.isRight()){
                                    // ja existe
                                    if(valid_friend_invite_response.value){
                                        return res.json(getJsonError(120, {
                                            values: {
                                                "remaining_time": valid_friend_invite_response.value.getRemainingTimeInSeconds()
                                            },
                                        }))
                                    }
                                }else{
                                    logError(valid_friend_invite_response.value, 'FriendInvitesController', 'store', 'FriendInviteRepository.searchOne')
                                    return res.sendStatus(500)
                                }
    
                                // create invite
                                const friend_invite_create_response = await FriendInviteRepository.create({
                                    sender: profile.uuid,
                                    receiver: friendProfile.uuid
                                })
                                if(friend_invite_create_response.isRight()){
                                    return res.sendStatus(201)
                                }
                                logError(friend_invite_create_response.value, 'FriendInvitesController', 'store', 'FriendInviteRepository.create')
                                return res.sendStatus(500)
                            }
                            return res.json(getJsonError(110))
                        }
                        return res.json(getJsonError(15, {
                            values: {
                                "uuid_target": new_friend_uuid
                            }
                        }))
                    }
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }
            logError(profile_response.value, 'FriendInvitesController', 'store', 'PlayerProfileRepository.search')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    },
    async accept(req: Request, res: Response){
        const { uuid, friend_uuid } = req.params
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
                        const friendProfile = friend_profile_response.value
                        if(friendProfile){
                            // busca convite de amizade valido
                            const valid_friend_invite_response = await FriendInviteRepository.searchOne({
                                sender: friendProfile.uuid,
                                receiver: profile.uuid,
                                valid_invite: true,
                                accepted: false
                            });
                            if(valid_friend_invite_response.isRight()){
                                const validFriendInvite = valid_friend_invite_response.value
                                if(validFriendInvite){
                                    // aceita convite
                                    const accept_response = await FriendInviteRepository.acceptInvite(validFriendInvite)
                                    if(accept_response.isLeft()){
                                        logError(accept_response.value, 'FriendInvitesController', 'accept', 'FriendInviteRepository.acceptInvite')
                                        return res.sendStatus(500)
                                    }
                                    // insere na lista de amigos do profile que aceitou
                                    const friend_list_response = await FriendsListRepository.insertFriend({
                                        friends_list_id: profile.friends_list,
                                        player_profile_uuid: friendProfile.uuid,
                                    })
                                    if(friend_list_response.isLeft()){
                                        logError(friend_list_response.value, 'FriendInvitesController', 'accept', 'FriendsListRepository.insertFriend')
                                        return res.sendStatus(500)
                                    }
                                    // insere na lista de amigos de profile que convidou
                                    const insert_response = await FriendsListRepository.insertFriend({
                                        friends_list_id: friendProfile.friends_list,
                                        player_profile_uuid: profile.uuid,
                                    })
                                    if(insert_response.isRight()){
                                        return res.sendStatus(200)
                                    }
                                    logError(valid_friend_invite_response.value, 'FriendInvitesController', 'accept', 'FriendsListRepository.insertFriend')
                                    return res.sendStatus(500)
                                }
                                return res.json(getJsonError(125));
                            }
                            logError(valid_friend_invite_response.value, 'FriendInvitesController', 'accept', 'FriendInviteRepository.searchOne')
                            return res.sendStatus(500)
                        }
                        return res.json(getJsonError(15, {
                            values: {
                                "uuid_target": friend_uuid
                            },
                        }))
                    }
                    logError(friend_profile_response.value, 'FriendInvitesController', 'accept', 'PlayerProfile.search')
                    return res.sendStatus(500)
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }
            logError(profile_response.value, 'FriendInvitesController', 'accept', 'PlayerProfile.search')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    },
}