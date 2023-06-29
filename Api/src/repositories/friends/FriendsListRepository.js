const FriendsList = require('../../models/friends/FriendsList')

module.exports = {
    async create({player_profile_id}){
        return await FriendsList.create({
            player_profile: player_profile_id
        })
    },
    async getById({friends_list_id}){
        return await FriendsList.findById(friends_list_id)
    },
    async search({player_profile_id}){
        return await FriendsList.findOne({
            player_profile: player_profile_id
        })
    },
    async insertFriend({friends_list, friends_list_id, player_profile_uuid }){
        if(friends_list){
            friends_list.friends.push({
                player_profile: player_profile_uuid,
            })
            await friends_list.save()
            return
        }
        const friendsList = this.getById({
            friends_list_id
        })
        if(friendsList){
            friendsList.friends.push({
                player_profile: player_profile_uuid,
            })
            await friendsList.save()
            return
        }
        throw "FriendList not founded"
    },
    async removeFriend({friends_list, friends_list_id, player_profile_uuid }){
        let friendsList
        if(friends_list){
            friendsList = friends_list
        }else{
            friendsList = this.getById({
                friends_list_id
            })
        }
        if(friendsList){
            let targetIndex = -1
            for(let i in friendsList.friends){
                if(friendsList.friends[i].player_profile == player_profile_uuid){
                    targetIndex = i
                    break
                }
            }
            if(targetIndex == -1){
                throw "Players aren't friends"
            }
            friendsList.friends.splice(targetIndex, 1)
            await friendsList.save()
            return
        }
        throw "FriendList not founded"
    }
}