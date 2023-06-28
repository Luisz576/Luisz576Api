const { logError, getJsonError } = require("../errors/errors")
const PlayerProfile = require("../models/player_profile/PlayerProfile")

module.exports = {
    async searsh(req, res){
        const { uuid } = req.params
        try{
            const profile = await PlayerProfile.findOne({uuid})
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
            logError(e, 'BlocksController', 'searsh')
            return res.sendStatus(500)
        }
    },
    async store(req, res){
        return res.sendStatus(501)
    },
    async delete(req, res){
        return res.sendStatus(501)
    }
}