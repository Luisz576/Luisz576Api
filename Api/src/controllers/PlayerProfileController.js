const BlockList = require('../models/player_profile/BlockList')
const FriendsList = require('../models/friends/FriendsList')
const PlayerProfile = require('../models/player_profile/PlayerProfile')
const ProductsList = require('../models/player_profile/ProductsList')
const validator = require('../services/validator')
const { getJsonError, logError } = require('../errors/errors')

module.exports = {
    async store(req, res){
        const { uuid, username } = req.body
        if(validator.validateUUID(uuid) && username){
            let profile = await PlayerProfile.findOne({ uuid })
            if(profile){
                return res.sendStatus(409)
            }
            try{
                profile = await PlayerProfile.create({ uuid, username })
            }catch(e){
                logError(e)
            }
            if(profile){
                let friends_list = await FriendsList.create({ player_profile: profile._id })
                let block_list = await BlockList.create({ player_profile: profile._id })
                let products_list = await ProductsList.create({ player_profile: profile._id })
                profile.friends_list = friends_list
                profile.block_list = block_list
                profile.products_list = products_list
                try{
                    await profile.save()
                    return res.sendStatus(201)
                }catch(e){
                    logError(e)
                }
            }
            return res.sendStatus(500)
        }
        return res.sendStatus(400)
    },
    async searsh(req, res){
        const { uuid } = req.params
        let profile
        try{
            profile = await PlayerProfile.findOne({ uuid })
        }catch(e){
            logError(e)
            return res.sendStatus(500)
        }
        if(profile){
            return res.json(profile)
        }
        return res.json(getJsonError(10, {values: { uuid }}))
    },
    async session(req, res){
        const { uuid } = req.params
        let profile
        try{
            profile = await PlayerProfile.findOne({ uuid })
        }catch(e){
            logError(e)
            return res.sendStatus(500)
        }
        if(profile){
            profile.last_login = Date.now()
            await profile.save()
            return res.sendStatus(200)
        }
        return res.json(getJsonError(10, {values: { uuid }}))
    },
}