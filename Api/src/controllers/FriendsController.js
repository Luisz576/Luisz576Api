const FriendInvite = require('../models/friends/FriendInvite')
const PlayerProfile = require('../models/player_profile/PlayerProfile')
const { getJsonError } = require('../errors/errors')

module.exports = {
    async searsh(req, res){
        const { uuid } = req.params
        let profile = await PlayerProfile.findOne({ uuid })
        if(profile){
            const friends = await profile.getFriends()
            return res.json({
                "status": 200,
                uuid,
                friends
            })
        }
        return res.json(getJsonError(10, {values: { uuid }}))
    },
    async store(req, res){
        const { new_friend_uuid } = req.body
        const { uuid } = req.params
        if(new_friend_uuid){
            let profile = await PlayerProfile.findOne({ uuid })
            let friend_profile = await PlayerProfile.findOne({ uuid: new_friend_uuid })
            if(profile){
                if(friend_profile){
                    // ve se ja nao sao amigos
                    if(await profile.areFriends(friend_profile.uuid)){
                        return res.json(getJsonError(115))
                    }
                    // ver se ja nao tem um convite ativo
                    const friendInvites = await FriendInvite.find({
                        sender_profile: profile._id,
                        receiver_profile: friend_profile._id
                    })
                    // procura convite valido e se tem retorna erro
                    for(let i in friendInvites){
                        const validateResult = friendInvites[i].stillValid()
                        if(validateResult.isValid){
                            return res.json(getJsonError(120, {
                                values: {
                                    "remaining_time": validateResult.remainingTimeInSeconds
                                },
                            }))
                        }
                    }
                    // TODO Validar de acordo com preferencias
                    // 0 - Publico
                    // 1 - Amigos de amigos?
                    // 2 - Ninguem
                    if(friend_profile.friend_invites_prefference == 0){
                        await FriendInvite.create({
                            sender_profile: profile._id,
                            receiver_profile: friend_profile._id,
                        })
                        return res.sendStatus(201)
                    }
                    return res.json(getJsonError(110, {
                        languageId: profile.language
                    }))
                }
                return res.json(getJsonError(15, {
                    values: {
                        "uuid_target": new_friend_uuid
                    }
                }))
            }
            return res.json(getJsonError(10, {values: { uuid }}))
        }
        return res.sendStatus(400)
    },
    async accept(req, res){
        const { uuid, friend_uuid } = req.params
        if(friend_uuid){
            let profile = await PlayerProfile.findOne({ uuid })
            if(profile){
                let friend_profile = await PlayerProfile.findOne({ uuid: friend_uuid })
                if(friend_profile){
                    if(await profile.areFriends(friend_profile.uuid)){
                        return res.json(getJsonError(115))
                    }
                    const friendInvites = await FriendInvite.find({
                        sender_profile: friend_profile._id,
                        receiver_profile: profile._id
                    })
                    // procura convite
                    for(let i in friendInvites){
                        const validateResult = friendInvites[i].stillValid()
                        if(validateResult.isValid){
                            // adiciona amigo
                            friendInvites[i].accepted = true
                            if(await profile.acceptNewFriend(friend_profile)){
                                // salva
                                await friendInvites[i].save()
                                await profile.save()
                                await friend_profile.save()
                                return res.sendStatus(200)
                            }
                            console.log("Error: can't acceptNewFriend")
                            return res.sendStatus(500)
                        }
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
        }
        return res.sendStatus(400)
    },
    async remove(req, res){
        const { uuid } = req.params
        const { friend_uuid } = req.body
        if(friend_uuid){
            let profile = await PlayerProfile.findOne({ uuid })
            if(profile){
                let friend_profile = await PlayerProfile.findOne({ uuid: friend_uuid })
                if(friend_profile){
                    if(await profile.areFriends(friend_profile.uuid)){
                        if(await profile.removeFriend(friend_profile)){
                            return res.sendStatus(200)
                        }
                        console.log("Error: can't removeFriend")
                        return res.sendStatus(500)
                    }
                    return res.json(getJsonError(117))
                }
                return res.json(getJsonError(15, {
                    values: {
                        "uuid_target": friend_uuid
                    },
                }))
            }
            return res.json(getJsonError(10, {values: { uuid }}))
        }
        return res.sendStatus(400)
    }
}