import PlayerProfile, { IPlayerProfile, IPlayerProfileConfigs, IPlayerProfileCreateProps, IPlayerProfileSearchProps } from "../../models/player_profile/PlayerProfile"
import validator from "../../services/validator"
import { OnlyExecutePromise, ReturnOrErrorPromise, left, right } from "../../types/either"
import FriendsListRepository from "../friends/FriendsListRepository"
import BlockListRepository from "./BlockListRepository"
import ProductsListRepository from "./ProductsListRepository"

type IPlayerProfileOrErrorReturn = ReturnOrErrorPromise<IPlayerProfile>
type MaybeIPlayerProfileOrErrorReturn = ReturnOrErrorPromise<IPlayerProfile | null>
interface SessionProps{
    player_profile?: IPlayerProfile
    uuid?: string
}
type IPlayerProfileConfigData = Partial<IPlayerProfileConfigs> & {
    uuid: string
}

export default {
    async store(data: IPlayerProfileCreateProps): IPlayerProfileOrErrorReturn{
        try{
            const profile = await PlayerProfile.create({
                uuid: data.uuid,
                username: data.username
            })
            if(profile){
                // talvez jogar pro default dos campos no PlayerProfileScheme?
                const friends_list_response = await FriendsListRepository.store({ player_profile: profile._id })
                const block_list_response = await BlockListRepository.store({ player_profile: profile._id })
                const products_list_response = await ProductsListRepository.store({ player_profile: profile._id })
                if(friends_list_response.isRight() && block_list_response.isRight() && products_list_response.isRight()){
                    profile.friends_list = friends_list_response.value._id
                    profile.block_list = block_list_response.value._id
                    profile.products_list = products_list_response.value._id
                    await profile.save()
                    return right(profile)
                }
                return left(`Some list wasn't generated for player '${data.username}' (${data.uuid})`)
            }
            return left(`Can't create profile for '${data.username}' (${data.uuid})`)
        }catch(err){
            return left(err)
        }
    },
    async getById(player_profile_id: string): MaybeIPlayerProfileOrErrorReturn{
        try{
            return right(await PlayerProfile.findById(player_profile_id))
        }catch(err){
            return left(err)
        }
    },
    async search(filter: IPlayerProfileSearchProps): MaybeIPlayerProfileOrErrorReturn{
        try{
            return right(await PlayerProfile.findOne(filter))
        }catch(err){
            return left(err)
        }
    },
    async session(session: SessionProps): OnlyExecutePromise{
        try{
            let profile: IPlayerProfile | null
            if(session.player_profile){
                profile = session.player_profile
            }else{
                if(session.uuid){
                    const search_response = await this.search({
                        uuid: session.uuid
                    })
                    if(search_response.isRight()){
                        profile = search_response.value 
                    }else{
                        return left(search_response.value)
                    }
                }else{
                    return left("No parameter was passed")
                }
            }
            if(profile){
                profile.last_login = new Date(Date.now())
                await profile.save()
                return right(null)
            }
            return left("PlayerProfile not founded")
        }catch(err){
            return left(err)
        }
    },
    async updateConfigsAndSocial(data: IPlayerProfileConfigData): ReturnOrErrorPromise<boolean>{
        try{
            // filter
            const filter: Omit<IPlayerProfileConfigData, 'uuid'> = {
                ...(data.language && { language: data.language }),
                ...(data.email && { email: data.email }),
                ...(data.discord && { discord: data.discord }),
                ...(data.youtube && { youtube: data.youtube }),
                ...(data.twitch && { twitch: data.twitch }),
            }
            if(validator.validateString(data.skin)){
                filter.skin = data.skin
            }
            if(validator.validateBoolean(data.friend_invites_preference)){
                filter.friend_invites_preference = data.friend_invites_preference
            }
            // update
            const profile = await PlayerProfile.findOneAndUpdate({
                uuid: data.uuid
            }, filter, {
                new: true
            })
            if(profile){
                return right(true)
            }
            return left("PlayerProfile not founded")
        }catch(err){
            return left(err)
        }
    },
    async updateRole(data: {player_profile: IPlayerProfile, role: number}): OnlyExecutePromise{
        try{
            data.player_profile.role = data.role
            await data.player_profile.save()
            return right(null)
        }catch(err){
            return left(err)
        }
    }
}