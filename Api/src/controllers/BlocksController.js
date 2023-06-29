const { logError, getJsonError } = require("../errors/errors")
const PlayerProfileRepository = require("../repositories/player_profile/PlayerProfileRepository")
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
                    const blocked_players = await profile.getBlocks()
                    return res.json({
                        status: 200,
                        uuid,
                        blocked_players
                    })
                }
                return res.sendStatus(getJsonError(10, { values: {uuid} }))
            }catch(e){
                logError(e, 'BlocksController', 'search')
                return res.sendStatus(500)
            }
        }
        return res.sendStatus(400)
    },
    async store(req, res){
        return res.sendStatus(501)
    },
    async delete(req, res){
        return res.sendStatus(501)
    }
}