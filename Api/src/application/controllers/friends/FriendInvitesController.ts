import { logError } from '../../../domain/errors/errors'
import validator from '../../../services/validator'
import CreateFriendInvite from '../../../usecases/friends/CreateFriendInvite'
import GetAllFriendInvitesOfPlayerProfile from '../../../usecases/friends/GetAllFriendInvitesOfPlayerProfile'
import AcceptFriendInvite from '../../../usecases/friends/AcceptFriendInvite'
import IHttpContext from '../../../domain/interfaces/IHttpContext'
import { ErrorType } from '../../../domain/errors/error_type'

export default class FriendInvitesController{
    constructor(
        private createFriendInvite: CreateFriendInvite,
        private getAllFriendInvitesOfPlayerProfile: GetAllFriendInvitesOfPlayerProfile,
        private acceptFriendInvite: AcceptFriendInvite
    ){}
    async search(httpContext: IHttpContext){
        const { uuid } = httpContext.getRequest().params
        if(validator.validateUUID(uuid)){
            const invites_response = await this.getAllFriendInvitesOfPlayerProfile.execute({
                uuid,
                accepted: false,
                is_valid: true
            })
            if(invites_response.isRight()){
                return httpContext.getResponse().json({
                    status: 200,
                    invites: invites_response.value
                })
            }
            if(invites_response.value.id == ErrorType.generic){
                logError(invites_response.value, 'FriendInvitesController.search', 'GetAllFriendInvitesOfPlayerProfile')
                return httpContext.getResponse().sendStatus(500)
            }
            return httpContext.getResponse().json(invites_response.value.toJson({
                uuid
            }))
        }
        return httpContext.getResponse().sendStatus(400)
    }
    async store(httpContext: IHttpContext){
        const { uuid } = httpContext.getRequest().params
        const { new_friend_uuid } = httpContext.getRequest().body
        if(validator.validateUUID(uuid) && validator.validateUUID(new_friend_uuid)){
            const create_response = await this.createFriendInvite.execute({
                sender_uuid: uuid,
                receiver_uuid: new_friend_uuid
            })
            if(create_response.isRight()){
                return httpContext.getResponse().sendStatus(200)
            }
            if(create_response.value.id == ErrorType.generic){
                logError(create_response.value, 'FriendInvitesController.store', 'CreateFriendInvite')
                return httpContext.getResponse().sendStatus(500)
            }
            return httpContext.getResponse().json(create_response.value.toJson({
                uuid,
                new_friend_uuid
            }))
        }
        return httpContext.getResponse().sendStatus(400)
    }
    async accept(httpContext: IHttpContext){
        const { uuid, friend_uuid } = httpContext.getRequest().params
        if(validator.validateUUID(uuid) && validator.validateUUID(friend_uuid)){
            const accept_response = await this.acceptFriendInvite.execute({
                receiver_uuid: uuid,
                sender_uuid: friend_uuid
            })
            if(accept_response.isRight()){
                return httpContext.getResponse().sendStatus(200)
            }
            if(accept_response.value.id == ErrorType.generic){
                logError(accept_response.value, 'FriendInvitesController.accept', 'AcceptFriendInvite')
                return httpContext.getResponse().sendStatus(500)
            }
            return httpContext.getResponse().json(accept_response.value.toJson({
                uuid,
                friend_uuid
            }))
        }
        return httpContext.getResponse().sendStatus(400)
    }
}