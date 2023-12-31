import { ErrorType } from "../../domain/errors/error_type"
import { ILogError, logErrorFactory } from "../../domain/errors/errors"
import { IPlayerProfileConfigs } from "../../domain/models/player_profile/PlayerProfile"
import { IPlayerProfileRepository } from "../../domain/repositories/player_profile/PlayerProfileRepository"
import validator from "../../services/validator"
import { Either, left, right } from "../../types/either"

type UpdateConfigsAndSocialOfPlayerProfileRequest = Partial<IPlayerProfileConfigs> & {
    uuid: string
}

export default class UpdateConfigsAndSocialOfPlayerProfile{
    constructor(
        private playerProfileRepository: IPlayerProfileRepository
    ){}
    async execute(data: UpdateConfigsAndSocialOfPlayerProfileRequest): Promise<Either<ILogError, null>>{
        try{
            // profile
            const profile = await this.playerProfileRepository.searchOne({
                uuid: data.uuid
            })
            if(!profile){
                // TODO
                return left(logErrorFactory(ErrorType.profile_not_founded))
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
            return left(logErrorFactory(ErrorType.generic, err))
        }
    }
}