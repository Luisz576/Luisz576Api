const BlockList = require('../models/player_profile/BlockList')
const FriendsList = require('../models/friends/FriendsList')
const PlayerProfile = require('../models/player_profile/PlayerProfile')
const ProductsList = require('../models/player_profile/ProductsList')
const FriendInvite = require('../models/friends/FriendInvite')

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
    },
    async addFriend(req, res){
        const { new_friend_uuid } = req.body
        const { uuid } = req.params
        if(uuid && new_friend_uuid){
            let profile = await PlayerProfile.findOne({ uuid })
            let friend_profile = await PlayerProfile.findOne({ uuid: new_friend_uuid })
            if(profile){
                if(friend_profile){
                    await FriendInvite.create({
                        sender_profile: profile._id,
                        receiver_profile: friend_profile._id,
                    })
                    return res.sendStatus(201)
                }
                return res.json({
                    "error": "Invalid 'new_friend_uuid'",
                    "error_id": 10
                })
            }
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