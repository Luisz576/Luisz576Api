const BlockList = require('../../models/player_profile/BlockList')

module.exports = {
    async create(player_profile_id){
        return await BlockList.create({player_profile: player_profile_id})
    },
    async searsh(player_profile_id){
        return await BlockList.findOne({player_profile: player_profile_id})
    },
    async block(player_profile_id, player_profile_id_to_block){
        // TODO
    },
    async unblock(player_profile_id, player_profile_id_to_unblock){
        // TODO
    }
}