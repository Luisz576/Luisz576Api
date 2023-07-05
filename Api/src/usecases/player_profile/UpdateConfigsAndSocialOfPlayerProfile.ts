import { IPlayerProfileConfigs } from "../../domain/models/player_profile/PlayerProfile"
import { IPlayerProfileRepository } from "../../domain/repositories/player_profile/PlayerProfileRepository"
import validator from "../../services/validator"
import { PromiseEither, left, right } from "../../types/either"

type UpdateConfigsAndSocialOfPlayerProfileRequest = Partial<IPlayerProfileConfigs> & {
    uuid: string
}

export default class UpdateConfigsAndSocialOfPlayerProfile{
    constructor(
        private playerProfileRepository: IPlayerProfileRepository
    ){}
    async execute(data: UpdateConfigsAndSocialOfPlayerProfileRequest): PromiseEither<any, null>{
        try{
            // profile
            const profile = await this.playerProfileRepository.searchOne({
                uuid: data.uuid
            })
            if(!profile){
                // TODO
                return left("")
            }

            // filter
            const filter: Partial<IPlayerProfileConfigs> = {
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
    
            await this.playerProfileRepository.updateConfigsAndSocial(data.uuid, filter)
            return right(null)
        }catch(err){
            return left(err)
        }
    }
}