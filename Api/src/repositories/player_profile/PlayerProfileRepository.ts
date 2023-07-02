import FriendsList from "../../models/friends/FriendsList"
import BlockList from "../../models/player_profile/BlockList"
import PlayerProfile, { IPlayerProfile, IPlayerProfileCreateProps, IPlayerProfileSearchProps } from "../../models/player_profile/PlayerProfile"
import validator from "../../services/validator"
import { Either, OnlyExecutePromise, left, right } from "../../types/either"
import ProductsListRepository from "./ProductsListRepository"

type IPlayerProfileOrErrorReturn = Promise<Either<any, IPlayerProfile | undefined>>
interface SessionProps{
    player_profile?: IPlayerProfile
    uuid?: string
}
interface IPlayerProfileConfigData{
    uuid: string
    skin?: string
    language?: number
    friend_invites_prefference?: boolean
    email?: string
    discord?: string
    youtube?: string
    twitch?: string
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
                const friends_list_response = await FriendsList.store({ player_profile: profile._id })
                const block_list_response = await BlockList.store({ player_profile: profile._id })
                const products_list_response = await ProductsListRepository.store({ player_profile: profile._id })
                profile.friends_list = friends_list_response.value
                profile.block_list = block_list_response.value
                profile.products_list = products_list_response.value
                await profile.save()
            }
            return right(profile)
        }catch(err){
            return left(err)
        }
    },
    async getById(player_profile_id: string): IPlayerProfileOrErrorReturn{
        try{
            return right(await PlayerProfile.findById(player_profile_id))
        }catch(err){
            return left(err)
        }
    },
    async search(filter: IPlayerProfileSearchProps): IPlayerProfileOrErrorReturn{
        try{
            return right(await PlayerProfile.findOne(filter))
        }catch(err){
            return left(err)
        }
    },
    async session(session: SessionProps): OnlyExecutePromise{
        try{
            let profile: IPlayerProfile | undefined
            if(session.player_profile){
                profile = session.player_profile
            }else{
                if(session.uuid){
                    profile = this.search({
                        uuid: session.uuid
                    })
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
    async updateConfigsAndSocial(data: IPlayerProfileConfigData): OnlyExecutePromise{
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
                filter.skin = ""
            }
            if(validator.validateBoolean(data.friend_invites_prefference)){
                filter.friend_invites_prefference = data.friend_invites_prefference
            }
            // update
            const profile = await PlayerProfile.findOneAndUpdate({
                uuid: data.uuid
            }, filter, {
                new: true
            })
            if(profile){
                return right(null)
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