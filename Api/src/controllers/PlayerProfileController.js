const PlayerProfile = require('../models/player_profile/PlayerProfile')

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
                return res.sendStatus(201)
            }
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    },
    async skin(req, res){
        const { uuid, skin } = req.body
        if(!uuid || !skin){
            return res.sendStatus(400)
        }
        let profile = await PlayerProfile.findOne({ uuid })
        if(profile){
            profile.skin = skin
            await profile.save()
            return res.sendStatus(200)
        }
        return res.sendStatus(400)
    },
    async session(req, res){
        const { uuid } = req.body
        let profile = await PlayerProfile.findOne({ uuid })
        if(profile){
            profile.last_login = Date.now()
            await profile.save()
            return res.sendStatus(200)
        }
        return res.sendStatus(400)
    }
}