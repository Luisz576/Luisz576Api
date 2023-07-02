import FriendsList from "../../models/friends/FriendsList"
import BlockList from "../../models/player_profile/BlockList"
import PlayerProfile, { IPlayerProfile, IPlayerProfileCreateProps, IPlayerProfileSearchProps } from "../../models/player_profile/PlayerProfile"
import validator from "../../services/validator"
import { Either, OnlyExecutePromise, left, right } from "../../types/either"
import ProductsListRepository from "./ProductsListRepository"

type PlayerProfileOrErrorReturn = Promise<Either<any, IPlayerProfile | undefined>>
type SessionProps = {
    player_profile?: IPlayerProfile
    uuid?: string
}

module.exports = {
    async create(data: IPlayerProfileCreateProps): PlayerProfileOrErrorReturn{
        try{
            const profile = await PlayerProfile.create({
                uuid: data.uuid,
                username: data.username
            })
            if(profile){
                const friends_list = await FriendsList.create({ player_profile: profile._id })
                const block_list = await BlockList.create({ player_profile: profile._id })
                const products_list = await ProductsListRepository.create({ player_profile: profile._id })
                profile.friends_list = friends_list
                profile.block_list = block_list
                profile.products_list = products_list
                await profile.save()
            }
            return right(profile)
        }catch(err){
            return left(err)
        }
    },
    async getById(player_profile_id: string): PlayerProfileOrErrorReturn{
        try{
            return right(await PlayerProfile.findById(player_profile_id))
        }catch(err){
            return left(err)
        }
    },
    async search(filter: IPlayerProfileSearchProps): PlayerProfileOrErrorReturn{
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
    async updateConfigsAndSocial({player_profile_uuid, skin, language, friend_invites_prefference, email, discord, youtube, twitch}){
        // filter
        const filter = {
            ...(language && { language }),
            ...(email && { email }),
            ...(discord && { discord }),
            ...(youtube && { youtube }),
            ...(twitch && { twitch }),
        }
        if(validator.validateString(skin)){
            filter.skin = ""
        }
        if(validator.validateBoolean(friend_invites_prefference)){
            filter.friend_invites_prefference = friend_invites_prefference
        }
        // update
        const profile = await PlayerProfile.findOneAndUpdate({
            uuid: player_profile_uuid
        }, filter, {
            new: true
        })
        if(profile){
            return profile
        }
        throw "PlayerProfile not founded"
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