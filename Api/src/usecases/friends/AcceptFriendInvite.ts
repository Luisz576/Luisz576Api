import { PromiseEither, left, right } from "../../types/either";

type AcceptFriendInviteRequest = {
    uuid: string,
    friend_uuid: string
}

/*

const profile_response = await PlayerProfileRepository.search({
                uuid
            })
            if(profile_response.isRight()){
                const profile = profile_response.value
                if(profile){
                    const friend_profile_response = await PlayerProfileRepository.search({
                        uuid: friend_uuid
                    })
                    if(friend_profile_response.isRight()){
                        const friendProfile = friend_profile_response.value
                        if(friendProfile){
                            // busca convite de amizade valido
                            const valid_friend_invite_response = await FriendInviteRepository.searchOne({
                                sender: friendProfile.uuid,
                                receiver: profile.uuid,
                                valid_invite: true,
                                accepted: false
                            });
                            if(valid_friend_invite_response.isRight()){
                                const validFriendInvite = valid_friend_invite_response.value
                                if(validFriendInvite){
                                    // aceita convite
                                    const accept_response = await FriendInviteRepository.acceptInvite(validFriendInvite)
                                    if(accept_response.isLeft()){
                                        logError(accept_response.value, 'FriendInvitesController', 'accept', 'FriendInviteRepository.acceptInvite')
                                        return httpContext.getResponse().sendStatus(500)
                                    }
                                    // insere na lista de amigos do profile que aceitou
                                    const friend_list_response = await FriendsListRepository.insertFriend({
                                        friends_list_id: profile.friends_list,
                                        player_profile_uuid: friendProfile.uuid,
                                    })
                                    if(friend_list_response.isLeft()){
                                        logError(friend_list_response.value, 'FriendInvitesController', 'accept', 'FriendsListRepository.insertFriend')
                                        return httpContext.getResponse().sendStatus(500)
                                    }
                                    // insere na lista de amigos de profile que convidou
                                    const insert_response = await FriendsListRepository.insertFriend({
                                        friends_list_id: friendProfile.friends_list,
                                        player_profile_uuid: profile.uuid,
                                    })
                                    if(insert_response.isRight()){
                                        return httpContext.getResponse().sendStatus(200)
                                    }
                                    logError(valid_friend_invite_response.value, 'FriendInvitesController', 'accept', 'FriendsListRepository.insertFriend')
                                    return httpContext.getResponse().sendStatus(500)
                                }
                                return httpContext.getResponse().json(getJsonError(125));
                            }
                            logError(valid_friend_invite_response.value, 'FriendInvitesController', 'accept', 'FriendInviteRepository.searchOne')
                            return httpContext.getResponse().sendStatus(500)
                        }
                        return httpContext.getResponse().json(getJsonError(15, {
                            values: {
                                "uuid_target": friend_uuid
                            },
                        }))
                    }
                    logError(friend_profile_response.value, 'FriendInvitesController', 'accept', 'PlayerProfile.search')
                    return httpContext.getResponse().sendStatus(500)
                }
                return httpContext.getResponse().json(getJsonError(10, {values: { uuid }}))
            }

*/

export default class AcceptFriendInvite{
    constructor(

    ){}
    async execute(data: AcceptFriendInviteRequest): PromiseEither<any, null>{
        try{
            //TODO
            return right(null)
        }catch(err){
            return left(err)
        }
    }
}