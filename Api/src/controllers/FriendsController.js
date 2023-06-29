const { getJsonError, logError } = require('../errors/errors')
const validator = require('../services/validator')

module.exports = {
    async search(req, res){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            try{
                const profile = await PlayerProfileRepository.search({
                    uuid
                })
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
                logError(e, 'FriendsController', 'search')
                return res.sendStatus(500)
            }
        }
        return res.sendStatus(400)
    },
    async remove(req, res){
        const { uuid } = req.params
        const { friend_uuid } = req.body
        if(validator.validateUUID(uuid) && validator.validateUUID(friend_uuid)){
            try{
                const profile = await await PlayerProfileRepository.search({
                    uuid
                })
                if(profile){
                    const friend_profile = await PlayerProfileRepository.search({
                        uuid: friend_uuid
                    })
                    if(friend_profile){
                        if(await profile.areFriends(friend_profile.uuid)){
                            // remove
                            await FriendsListRepository.removeFriend({
                                friends_list_id: this.friends_list,
                                player_profile_uuid: profile.uuid
                            })
                            await FriendsListRepository.removeFriend({
                                friends_list_id: profile.friends_list,
                                player_profile_uuid: this.uuid
                            })
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