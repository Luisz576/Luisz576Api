const BlockList = require('../../models/player_profile/BlockList')

export default {
    async create({player_profile_id}){
        return await BlockList.create({
            player_profile: player_profile_id
        })
    },
    async getById({block_list_id}){
        return await BlockList.findById(block_list_id)
    },
    async search({player_profile_id}){
        return await BlockList.findOne({
            player_profile: player_profile_id
        })
    },
    async block(){
        // TODO
    },
    async unblock(){
        // TODO
    }
}