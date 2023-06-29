const PlayerProfile = require('../../models/player_profile/PlayerProfile')

module.exports = {
    async create({uuid, username}){
        const profile = await PlayerProfile.create({uuid, username})
        if(profile){
            const friends_list = await FriendsList.create({ player_profile: profile._id })
            const block_list = await BlockList.create({ player_profile: profile._id })
            const products_list = await ProductsList.create({ player_profile: profile._id })
            profile.friends_list = friends_list
            profile.block_list = block_list
            profile.products_list = products_list
            await profile.save()
        }
        return profile
    },
    async getById({player_profile_id}){
        return await PlayerProfile.findById(player_profile_id)
    },
    async searsh({uuid, username}){
        const filter = {}
        if(uuid){
            filter.uuid = uuid
        }
        if(username){
            filter.username = username
        }
        return await PlayerProfile.findOne(filter)
    },
    async session({player_profile, player_profile_uuid}){
        let profile
        if(player_profile){
            profile = player_profile
            return
        }
        profile = this.searsh({
            uuid: player_profile_uuid
        })
        if(profile){
            profile.last_login = Date.now()
            await profile.save()
            return
        }
        throw "PlayerProfile not founded"
    },
    async updateConfigsAndSocial({skin, language, friend_invite_prefference, email, discord, youtube, twitch}){
        // TODO
    },
    async updateRole({role}){
        // TODO
    }
}