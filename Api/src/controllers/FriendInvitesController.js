const FriendInvite = require('../models/friends/FriendInvite')
const PlayerProfile = require('../models/player_profile/PlayerProfile')
const { getJsonError, logError } = require('../errors/errors')
const validator = require('../services/validator')

async function acceptFriendInvite(friendInvite, profile, profile2){
    if(friendInvite && profile && profile2){
        // aceita convite
        friendInvite.accept()
        // adiciona amigo
        await profile.addNewFriend(profile2)
        // salva
        await friendInvite.save()
        await profile.save()
        await profile2.save()
        return
    }
    throw "Invalid args in function 'acceptFriendInvite'"
}

module.exports = {
    async searsh(req, res){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            try{
                const friend_invites = await FriendInvite.findAllValidInvitesFor(uuid)
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
                const profile = await PlayerProfile.findOne({ uuid })
                const friend_profile = await PlayerProfile.findOne({ uuid: new_friend_uuid })
                if(profile){
                    if(friend_profile){
                        // ve se ja nao sao amigos
                        if(await profile.areFriends(friend_profile.uuid)){
                            return res.json(getJsonError(115))
                        }

                        // ve se esta com os pedidos de amizade ativos
                        if(friend_profile.friend_invites_prefference){
                            // ver se ja nao tem um convite ativo
                            const validFriendInvite = await FriendInvite.findValidInvite(profile.uuid, friend_profile.uuid)
                            // ja existe
                            if(validFriendInvite){
                                validateResult = validFriendInvite.stillValid()
                                return res.json(getJsonError(120, {
                                    values: {
                                        "remaining_time": validateResult.remainingTimeInSeconds
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
                            await FriendInvite.create({
                                sender: profile.uuid,
                                receiver: friend_profile.uuid,
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
                const profile = await PlayerProfile.findOne({ uuid })
                if(profile){
                    const friend_profile = await PlayerProfile.findOne({ uuid: friend_uuid })
                    if(friend_profile){
                        // ve se ja sao amigos
                        if(await profile.areFriends(friend_profile.uuid)){
                            return res.json(getJsonError(115))
                        }
                        // busca convite de amizade valido
                        let validFriendInvite = await FriendInvite.findValidInvite(friend_profile.uuid, profile.uuid)
                        if(validFriendInvite){
                            await acceptFriendInvite(validFriendInvite, profile, friend_profile)
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