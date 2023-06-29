const { getJsonError, logError } = require('../errors/errors')
const validator = require('../services/validator')
const FriendInviteRepository = require('../repositories/friends/FriendInviteRepository')
const PlayerProfileRepository = require('../repositories/player_profile/PlayerProfileRepository')
const FriendsListRepository = require('../repositories/friends/FriendsListRepository')

module.exports = {
    async searsh(req, res){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            try{
                const friend_invites = await FriendInviteRepository.findAllValids({
                    receiver_uuid: uuid
                })
                return res.json({
                    status: "200",
                    uuid,
                    friend_invites
                })
            }catch(e){
                logError(e, 'FriendInvitesController', 'searsh')
                return res.sendStatus(500)
            }
        }
        return res.sendStatus(400)
    },
    async store(req, res){
        const { new_friend_uuid } = req.body
        const { uuid } = req.params
        if(validator.validateUUID(uuid) && validator.validateUUID(new_friend_uuid)){
            try{
                const profile = await PlayerProfileRepository.searsh({
                    uuid
                })
                if(profile){
                    const friend_profile = await PlayerProfileRepository.searsh({
                        uuid: new_friend_uuid
                    })
                    if(friend_profile){
                        // ve se ja nao sao amigos
                        if(await profile.areFriends(friend_profile.uuid)){
                            return res.json(getJsonError(115))
                        }
                        // ve se esta com os pedidos de amizade ativos
                        if(friend_profile.friend_invites_prefference){
                            // ver se ja nao tem um convite ativo
                            const validFriendInvite = await FriendInviteRepository.findValid({
                                sender_uuid: profile.uuid,
                                receiver_uuid: friend_profile.uuid
                            })
                            // ja existe
                            if(validFriendInvite){
                                return res.json(getJsonError(120, {
                                    values: {
                                        "remaining_time": validFriendInvite.getRemainingTimeInSeconds()
                                    },
                                }))
                            }

                            /* TODO deixar api java validar? e ai aqui so retorna que ja tem do outro player?
                            // se o outro player tiver convidado, adiciona como amigo
                            validFriendInvite = await FriendInvite.findValidInvite(friend_profile._id, profile._id)
                            if(validFriendInvite){
                                // await acceptFriendInvite()
                                return res.sendStatus(501)
                            }
                            */

                            // create invite
                            await FriendInviteRepository.create({
                                sender_uuid: profile.uuid,
                                receiver_uuid: friend_profile.uuid
                            })
                            return res.sendStatus(201)
                        }
                        return res.json(getJsonError(110))
                    }
                    return res.json(getJsonError(15, {
                        values: {
                            "uuid_target": new_friend_uuid
                        }
                    }))
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }catch(e){
                logError(e, 'FriendInvitesController', 'store')
                return res.sendStatus(500)
            }
        }
        return res.sendStatus(400)
    },
    async accept(req, res){
        const { uuid, friend_uuid } = req.params
        if(validator.validateUUID(uuid) && validator.validateUUID(friend_uuid)){
            try{
                const profile = await PlayerProfileRepository.searsh({
                    uuid
                })
                if(profile){
                    const friend_profile = await PlayerProfileRepository.searsh({
                        uuid: friend_uuid
                    })
                    if(friend_profile){
                        // ve se ja sao amigos
                        if(await profile.areFriends(friend_profile.uuid)){
                            return res.json(getJsonError(115))
                        }
                        // busca convite de amizade valido
                        const validFriendInvite = await FriendInviteRepository.findValid({
                            sender_uuid: friend_profile.uuid,
                            receiver_uuid: profile.uuid
                        });
                        if(validFriendInvite){
                            // aceita convite
                            await FriendInviteRepository.acceptInvite({
                                friend_invite: validFriendInvite
                            })
                            // insere na lista de amigos do profile que aceitou
                            await FriendsListRepository.insertFriend({
                                friends_list: profile.friends_list,
                                player_profile_uuid: friend_profile.uuid,
                            })
                            // insere na lista de amigos de profile que convidou
                            await FriendsListRepository.insertFriend({
                                friends_list: profile.friends_list,
                                player_profile_uuid: friend_profile.uuid,
                            })
                            return res.sendStatus(200)
                        }
                        return res.json(getJsonError(125));
                    }
                    return res.json(getJsonError(15, {
                        values: {
                            "uuid_target": friend_uuid
                        },
                    }))
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }catch(e){
                logError(e, 'FriendInvitesController', 'accept')
                return res.sendStatus(500)
            }
        }
        return res.sendStatus(400)
    },
}