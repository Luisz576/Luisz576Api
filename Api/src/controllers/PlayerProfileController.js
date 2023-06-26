const BlockList = require('../models/player_profile/BlockList')
const FriendsList = require('../models/friends/FriendsList')
const PlayerProfile = require('../models/player_profile/PlayerProfile')
const ProductsList = require('../models/player_profile/ProductsList')

const { validateEmail, validateDiscord, validateTwitch, validateYoutube } = require('../services/validator')
const { getJsonError } = require('../domain/errors/errors')

module.exports = {
    async store(req, res){
        const { uuid, username } = req.body
        if(uuid && username){
            let profile = await PlayerProfile.findOne({ uuid })
            if(profile){
                return res.sendStatus(409)
            }
            profile = await PlayerProfile.create({ uuid, username })
            if(profile){
                let friends_list = await FriendsList.create({ player_profile: profile._id })
                let block_list = await BlockList.create({ player_profile: profile._id })
                let products_list = await ProductsList.create({ player_profile: profile._id })
                profile.friends_list = friends_list
                profile.block_list = block_list
                profile.products_list = products_list
                await profile.save()
                return res.sendStatus(201)
            }
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    },
    async searsh(req, res){
        const { uuid } = req.params
        if(uuid){
            let profile = await PlayerProfile.findOne({ uuid })
            if(profile){
                return res.json(profile)
            }
            return res.json(getJsonError(10, {values: { uuid }}))
        }
        return res.sendStatus(400)
    },
    async session(req, res){
        const { uuid } = req.body
        if(uuid){
            let profile = await PlayerProfile.findOne({ uuid })
            if(profile){
                profile.last_login = Date.now()
                await profile.save()
                return res.sendStatus(200)
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
                // TODO se decidir manter os ids ao inves de ativo e nao ativo, criar um validador
                profile.friend_invites_prefference = friend_invite_prefference
                await profile.save()
                return res.sendStatus(200)
            }
            return res.json(getJsonError(10, {values: { uuid }}))
        }
        return res.sendStatus(400)
    },
    // SOCIAL
    async updateSocialMedia(req, res){
        const { uuid } = req.params
        const { email, discord, twitch, youtube } = req.body
        if(uuid){
            let profile = await PlayerProfile.findOne({ uuid })
            if(profile){
                let validInfo = true
                if(email){
                    if(validateEmail(email)){
                        profile.email = email.toLowerCase()
                    }else{
                        validInfo = false
                    }
                }
                if(discord){
                    if(validateDiscord(discord)){
                        profile.discord = discord.toLowerCase()
                    }else{
                        validInfo = false
                    }
                }
                if(twitch){
                    if(validateTwitch(twitch)){
                        profile.twitch = twitch.toLowerCase()
                    }else{
                        validInfo = false
                    }
                }
                if(youtube){
                    if(validateYoutube(youtube)){
                        profile.youtube = youtube.toLowerCase()
                    }else{
                        validInfo = false
                    }
                }
                if(validInfo){
                    await profile.save()
                    return res.sendStatus(200)
                }
                return res.sendStatus(304) //not modified
            }
            return res.json(getJsonError(10, {values: { uuid }}))
        }
        return res.sendStatus(400)
    }
}