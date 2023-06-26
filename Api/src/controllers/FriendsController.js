const FriendInvite = require('../models/friends/FriendInvite')
const PlayerProfile = require('../models/player_profile/PlayerProfile')
const { getJsonError } = require('../domain/errors/errors')
const FriendsList = require('../models/friends/FriendsList')

module.exports = {
    async addFriend(req, res){
        const { new_friend_uuid } = req.body
        const { uuid } = req.params
        if(uuid && new_friend_uuid){
            let profile = await PlayerProfile.findOne({ uuid })
            let friend_profile = await PlayerProfile.findOne({ uuid: new_friend_uuid })
            if(profile){
                let profile_friends = await FriendsList.findOne({ player_profile: profile._id })
                // Erro no server, não existe uma lista de amigos!
                if(!profile_friends){
                    // TODO Tenta criar ao inves de so dar erro?
                    console.log("Error: Player hasn't 'FriendsList'")
                    return res.sendStatus(500)
                }
                if(friend_profile){
                    // ve se ja nao sao amigos
                    if(profile_friends.friends.includes(profile._id)){
                        return res.json(getJsonError(115))
                    }
                    // ver se ja nao tem um convite ativo
                    const friendInvites = await FriendInvite.find({
                        sender_profile: profile._id,
                        receiver_profile: friend_profile._id
                    })
                    if(friendInvites.length > 0){
                        for(let i in friendInvites){
                            if(!friendInvites[i].accepted){
                                //TODO friendInvites[i].created valida se é um convite válido
                                const passedTimeInSeconds = 100 // calcular
                                const MAX_TIME = (60 * 5) // TODO tornar constante em algum lugar
                                if(passedTimeInSeconds < MAX_TIME){
                                    return res.json(getJsonError(120, {
                                        values: {
                                            "remaining_time": (MAX_TIME - passedTimeInSeconds)
                                        },
                                    }))
                                }
                            }
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
        if(uuid && friend_invite_prefference != undefined){
            let profile = await PlayerProfile.findOne({ uuid })
            if(profile){
                // TODO se decidir manter os ids ao inves de ativo e nao ativo criar um validador
                profile.friend_invites_prefference = friend_invite_prefference
                await profile.save()
                return res.sendStatus(200)
            }
            return res.json(getJsonError(10, {values: { uuid }}))
        }
        return res.sendStatus(400)
    },
    async acceptFriendInvite(req, res){
        const { uuid, friend_uuid } = req.params
        return res.sendStatus(404)
    },
    async removeFriend(req, res){
        return res.sendStatus(404)
    }
}