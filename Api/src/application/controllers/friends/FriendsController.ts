import validator from '../../../services/validator'
import { logError } from '../../../domain/errors/errors'
import IHttpContext from '../../../domain/interfaces/IHttpContext'
import GetAllFriends from '../../../usecases/friends/GetAllFriends'
import RemoveFriend from '../../../usecases/friends/RemoveFriend'

export default class FriendsController{
    constructor(
        private getAllFriends: GetAllFriends,
        private removeFriend: RemoveFriend
    ){}
    async search(httpContext: IHttpContext){
        const { uuid } = httpContext.getRequest().params
        if(validator.validateUUID(uuid)){
            const friends_response = await this.getAllFriends.execute({
                uuid
            })
            if(friends_response.isRight()){
                return httpContext.getResponse().json({
                    status: 200,
                    uuid,
                    friends: friends_response.value
                })
            }
            logError(friends_response.value, 'FriendsController', 'search', 'GetAllFriends')
            return httpContext.getResponse().sendStatus(500)
        }
        return httpContext.getResponse().sendStatus(400)
    }
    async remove(httpContext: IHttpContext){
        const { uuid } = httpContext.getRequest().params
        const { friend_uuid } = httpContext.getRequest().body
        if(validator.validateUUID(uuid) && validator.validateUUID(friend_uuid)){
            const remove_friends_response = await this.removeFriend.execute({
                player_uuid: uuid,
                target_uuid: friend_uuid
            })
            if(remove_friends_response.isRight()){
                return httpContext.getResponse().sendStatus(200)
            }
            logError(remove_friends_response.value, 'FriendsController', 'remove', 'RemoveFriend')
            return httpContext.getResponse().sendStatus(500)
        }
        return httpContext.getResponse().sendStatus(400)
    }
}