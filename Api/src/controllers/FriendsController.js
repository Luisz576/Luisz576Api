const FriendInvite = require('../models/friends/FriendInvite')
const PlayerProfile = require('../models/player_profile/PlayerProfile')
const { getJsonError } = require('../domain/errors/errors')

module.exports = {
    async addFriend(req, res){
        const { new_friend_uuid } = req.body
        const { uuid } = req.params
        if(uuid && new_friend_uuid){
            let profile = await PlayerProfile.findOne({ uuid })
            let friend_profile = await PlayerProfile.findOne({ uuid: new_friend_uuid })
            if(profile){
                if(friend_profile){
                    // TODO ver se ja nao sao amigos
                    // TODO ver se ja nao tem um convite ativo
                    // TODO Validar de acordo com preferencias
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
                        "uuid_target": 'new_friend_uuid'
                    },
                    languageId: profile.language
                }))
            }
            return res.json(getJsonError(10, {values: { uuid }}))
        }
        return res.sendStatus(400)
    },
    async changeFriendInvitePrefferences(req, res){
        const { uuid } = req.params
        const { friend_invite_prefference } = req.body
        return res.sendStatus(404)
    },
    async acceptFriendInvite(req, res){
        const { uuid, friend_uuid } = req.params
        return res.sendStatus(404)
    },
    async removeFriend(req, res){
        return res.sendStatus(404)
    }
}