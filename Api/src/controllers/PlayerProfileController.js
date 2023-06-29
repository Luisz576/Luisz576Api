const validator = require('../services/validator')
const { getJsonError, logError } = require('../errors/errors')
const PlayerProfileRepository = require('../repositories/player_profile/PlayerProfileRepository')

module.exports = {
    async store(req, res){
        const { uuid, username } = req.body
        if(validator.validateUUID(uuid) && username){
            try{
                // uuid
                const profileByUUID = await PlayerProfileRepository.search({
                    uuid
                })
                if(profileByUUID){
                    return res.sendStatus(409)
                }
                // username
                const profileByUsername = await PlayerProfileRepository.search({
                    username
                })
                if(profileByUsername){
                    return res.sendStatus(409)
                }
                // cria
                const profile = await PlayerProfileRepository.create({
                    uuid,
                    username
                })
                if(profile){
                    return res.json({
                        status: 200,
                        profile
                    })
                }
                return res.sendStatus(500)
            }catch(e){
                logError(e)
                return res.sendStatus(500)
            }
        }
        return res.sendStatus(400)
    },
    async search(req, res){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            try{
                const profile = await PlayerProfileRepository.search({
                    uuid
                })
                if(profile){
                    return res.json({
                        status: 200,
                        profile
                    })
                }
                return res.json(getJsonError(10, {values: { uuid }}))
            }catch(e){
                logError(e)
                return res.sendStatus(500)
            }
        }
        return res.sendStatus(400)
    },
    async session(req, res){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            try{
                const profile = await PlayerProfileRepository.search({
                    uuid
                })
                if(profile){
                    if(await profile.isBanned()){
                        return res.json(getJsonError(220))
                    }
                    // session
                    await PlayerProfileRepository.session({
                        player_profile: profile
                    })
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
}