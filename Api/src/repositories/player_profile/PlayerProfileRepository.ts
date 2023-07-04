import { IPlayerProfileConfigs, IPlayerProfileCreateProps, IPlayerProfileSearchProps } from "../../domain/models/player_profile/PlayerProfile"
import { IPlayerProfileRepository, SearchByProfileIdRequest, UpdateRoleRequest } from "../../domain/repositories/player_profile/PlayerProfileRepository"
import PlayerProfile, { IPlayerProfileModel } from "../../schemas/player_profile/PlayerProfile"
/*
// jogar isso pro usecase e alterar no props create do playerprofile para ter os ids
            const friends_list_response = await FriendsListRepository.store({ player_uuid: profile.uuid  })
            const block_list_response = await BlockListRepository.store({ player_uuid: profile.uuid })
            const products_list_response = await ProductsListRepository.store({ player_uuid: profile.uuid })
            if(friends_list_response.isRight() && block_list_response.isRight() && products_list_response.isRight()){
                profile.friends_list = friends_list_response.value._id
                profile.block_list = block_list_response.value._id
                profile.products_list = products_list_response.value._id
                await profile.save()
                return profile
            }
            throw new Error(`Some list wasn't generated for player '${data.username}' (${data.uuid})`)
*/
class PlayerProfileRepository implements IPlayerProfileRepository{
    async store(data: IPlayerProfileCreateProps): Promise<IPlayerProfileModel>{
        const profile = await PlayerProfile.create(data)
        if(profile){
            return profile
        }
        throw new Error(`Can't create profile for '${data.username}' (${data.uuid})`)
    }
    async searchOne(filter: IPlayerProfileSearchProps): Promise<IPlayerProfileModel | null>{
        return await PlayerProfile.findOne(filter)
    }
    async session(session: SearchByProfileIdRequest): Promise<void>{
        const player_profile = await this.searchOne({
            uuid: session.uuid
        })
        if(player_profile){
            player_profile.last_login = new Date(Date.now())
            await player_profile.save()
            return
        }
        throw new Error("PlayerProfile not founded")
    }
    async updateConfigsAndSocial(uuid: string, data: Partial<IPlayerProfileConfigs>): Promise<void>{
        const profile = await PlayerProfile.findOneAndUpdate({
            uuid
        }, data)
        if(profile){
            return
        }
        throw new Error("PlayerProfile not founded")
    }
    async updateRole(data: UpdateRoleRequest): Promise<void>{
        const profile = await PlayerProfile.findOneAndUpdate({
            uuid: data.player_uuid
        }, {
            role: data.role
        })
        if(profile){
            return
        }
        throw new Error("PlayerProfile not founded")
    }
    async setHasPunishment(data: SearchByProfileIdRequest): Promise<void> {
        const player_profile = await this.searchOne({
            uuid: data.uuid
        })
        if(!player_profile){
            throw new Error("PlayerProfile not founded")
        }
        player_profile.punishment = true
        await player_profile.save()
    }
}

const playerProfileRepository = new PlayerProfileRepository()

export default playerProfileRepository