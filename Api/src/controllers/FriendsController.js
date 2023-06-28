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