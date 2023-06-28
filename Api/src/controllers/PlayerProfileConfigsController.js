const { isRole, isAdmin } = require('../domain/Roles')
const { getJsonError, logError } = require('../errors/errors')
const PlayerProfile = require('../models/player_profile/PlayerProfile')
const validator = require('../services/validator')

module.exports = {
    async updateSkin(req, res){
        const { uuid } = req.params
        const { skin } = req.body
        try{
            const profile = await PlayerProfile.findOne({ uuid })
            if(profile){
                profile.skin = skin
                await profile.save()
                return res.sendStatus(200)
            }
            return res.json(getJsonError(10, {values: { uuid }}))
        }catch(e){
            logError(e)
            return res.sendStatus(500)
        }
    },
    async updateRole(req, res){
        const { uuid } = req.params
        const { applicator_uuid, role_id } = req.body
        if(validator.validateUUID(applicator_uuid) && isRole(role_id)){
            try{
                const profile = await PlayerProfile.findOne({ uuid })
                if(profile){
                    const applicator_profile = await PlayerProfile.findOne({ uuid: applicator_uuid })
                    if(applicator_profile){
                        if(isAdmin(applicator_profile.role)){
                            profile.role = role_id
                            await profile.save()
                            return res.sendStatus(200)  
                        }
                        return res.json(getJsonError(210))
                    }
                    return res.json(getJsonError(15, {
                        values: {
                            "uuid_target": applicator_uuid
                        },
                    }))
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }catch(e){
                logError(e)
                return res.sendStatus(500)
            }
        }
        return res.sendStatus(400)
    },
    async updateLanguage(req, res){
        const { uuid } = req.params
        const { language } = req.body
        if(validator.validateLanguage(language)){
            let profile
            try{
                profile = await PlayerProfile.findOne({ uuid })
                if(profile){
                    profile.language = language
                    await profile.save()
                    return res.sendStatus(200)
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }catch(e){
                logError(e)
                return res.sendStatus(500)
            }
        }
        return res.sendStatus(400)
    },
    async updateFriendInvitePrefferences(req, res){
        const { uuid } = req.params
        const { friend_invite_prefference } = req.body
        if(validator.validateFriendInvitePrefference(friend_invite_prefference)){
            try{
                const profile = await PlayerProfile.findOne({ uuid })
                if(profile){
                    profile.friend_invites_prefference = friend_invite_prefference
                    await profile.save()
                    return res.sendStatus(200)
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }catch(e){
                logError(e)
                return res.sendStatus(500)
            }
        }
        return res.sendStatus(400)
    },
    // SOCIAL
    async updateSocialMedia(req, res){
        const { uuid } = req.params
        const { email, discord, twitch, youtube } = req.body
        try{
            const profile = await PlayerProfile.findOne({ uuid })
            if(profile){
                let validInfo = true
                if(email){
                    if(validator.validateEmail(email)){
                        profile.email = email.toLowerCase()
                    }else{
                        validInfo = false
                    }
                }
                if(discord){
                    if(validator.validateDiscord(discord)){
                        profile.discord = discord.toLowerCase()
                    }else{
                        validInfo = false
                    }
                }
                if(twitch){
                    if(validator.validateTwitch(twitch)){
                        profile.twitch = twitch.toLowerCase()
                    }else{
                        validInfo = false
                    }
                }
                if(youtube){
                    if(validator.validateYoutube(youtube)){
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
        }catch(e){
            logError(e)
            return res.sendStatus(500)
        }
    }
}