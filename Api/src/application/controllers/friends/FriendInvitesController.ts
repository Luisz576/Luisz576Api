import { getJsonError, logError } from '../../../domain/errors/errors'
import validator from '../../../services/validator'
import FriendInviteRepository from '../../../repositories/friends/FriendInviteRepository'
import PlayerProfileRepository from '../../../repositories/player_profile/PlayerProfileRepository'
import FriendsListRepository from '../../../repositories/friends/FriendsListRepository'
import CreateFriendInvite from '../../../usecases/friends/CreateFriendInvite'
import GetAllFriendInvitesOfPlayerProfile from '../../../usecases/friends/GetAllFriendInvitesOfPlayerProfile'
import IRequest from '../../../domain/adapters/IRequest'
import IResponse from '../../../domain/adapters/IResponse'

export default class FriendInvitesController{
    constructor(
        private createFriendInvite: CreateFriendInvite,
        private getAllFriendInvitesOfPlayerProfile: GetAllFriendInvitesOfPlayerProfile
    ){}
    async search(req: IRequest, res: IResponse){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            const invites_response = await this.getAllFriendInvitesOfPlayerProfile.execute({
                uuid,
                accepted: false,
                is_valid: true
            })
            if(invites_response.isRight()){
                return res.json({
                    status: 200,
                    invites: invites_response.value
                })
            }
            logError(invites_response.value, 'FriendInvitesController', 'search', 'GetAllFriendInvitesOfPlayerProfile')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    }
    async store(req: IRequest, res: IResponse){
        const { uuid } = req.params
        const { new_friend_uuid } = req.body
        if(validator.validateUUID(uuid) && validator.validateUUID(new_friend_uuid)){
            const create_response = await this.createFriendInvite.execute({
                sender_uuid: uuid,
                receiver_uuid: new_friend_uuid
            })
            if(create_response.isRight()){
                return res.sendStatus(200)
            }
            logError(create_response.value, 'FriendInvitesController', 'store', 'CreateFriendInvite')
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    }
    async accept(req: IRequest, res: IResponse){
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
    }
}