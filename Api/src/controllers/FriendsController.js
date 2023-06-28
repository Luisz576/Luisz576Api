const FriendInvite = require('../models/friends/FriendInvite')
const PlayerProfile = require('../models/player_profile/PlayerProfile')
const { getJsonError, logError } = require('../errors/errors')
const validator = require('../services/validator')

module.exports = {
    async searsh(req, res){
        const { uuid } = req.params
        try{
            const profile = await PlayerProfile.findOne({ uuid })
            if(profile){
                const friends = await profile.getFriends()
                return res.json({
                    "status": 200,
                    uuid,
                    friends
                })
            }
            return res.json(getJsonError(10, {values: { uuid }}))
        }catch(e){
            logError(e, 'FriendsController', 'searsh')
            return res.sendStatus(500)
        }
    },
    async store(req, res){
        const { new_friend_uuid } = req.body
        const { uuid } = req.params
        if(validator.validateUUID(new_friend_uuid)){
            try{
                const profile = await PlayerProfile.findOne({ uuid })
                const friend_profile = await PlayerProfile.findOne({ uuid: new_friend_uuid })
                if(profile){
                    if(friend_profile){
                        // ve se ja nao sao amigos
                        if(await profile.areFriends(friend_profile.uuid)){
                            return res.json(getJsonError(115))
                        }

                        if(friend_profile.friend_invites_prefference){
                            //TODO se tiver o inverso, ja adiciona como amigo

                            // ver se ja nao tem um convite ativo
                            const validFriendInvite = await FriendInvite.findValidInvite(profile._id, friend_profile._id)

                            // ja existe
                            if(validFriendInvite){
                                validateResult = validFriendInvite.stillValid()
                                return res.json(getJsonError(120, {
                                    values: {
                                        "remaining_time": validateResult.remainingTimeInSeconds
                                    },
                                }))
                            }

                            // create invite
                            await FriendInvite.create({
                                sender_profile: profile._id,
                                receiver_profile: friend_profile._id,
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
                logError(e, 'FriendsController', 'store')
                return res.sendStatus(500)
            }
        }
        return res.sendStatus(400)
    },
    async accept(req, res){
        const { uuid, friend_uuid } = req.params
        if(validator.validateUUID(friend_uuid)){
            try{
                const profile = await PlayerProfile.findOne({ uuid })
                if(profile){
                    const friend_profile = await PlayerProfile.findOne({ uuid: friend_uuid })
                    if(friend_profile){
                        // ve se ja sao amigos
                        if(await profile.areFriends(friend_profile.uuid)){
                            return res.json(getJsonError(115))
                        }  

                        const validFriendInvite = await FriendInvite.findValidInvite(friend_profile._id, profile._id)
                        if(validFriendInvite){
                            // adiciona amigo
                            validFriendInvite.accepted = true
                            await profile.addNewFriend(friend_profile)
                            // salva
                            await validFriendInvite.save()
                            await profile.save()
                            await friend_profile.save()
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
                logError(e, 'FriendsController', 'accept')
                return res.sendStatus(500)
            }
        }
        return res.sendStatus(400)
    },
    async remove(req, res){
        const { uuid } = req.params
        const { friend_uuid } = req.body
        if(validator.validateUUID(friend_uuid)){
            try{
                const profile = await PlayerProfile.findOne({ uuid })
                if(profile){
                    const friend_profile = await PlayerProfile.findOne({ uuid: friend_uuid })
                    if(friend_profile){
                        if(await profile.areFriends(friend_profile.uuid)){
                            await profile.removeFriend(friend_profile)
                            return res.sendStatus(200)
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
            }catch(e){
                logError(e, 'FriendsController', 'remove')
                return res.sendStatus(500)
            }
        }
        return res.sendStatus(400)
    }
}