import { ErrorType } from "../../domain/errors/error_type";
import { ILogError, logErrorFactory } from "../../domain/errors/errors";
import { IPlayerProfileRepository } from "../../domain/repositories/player_profile/PlayerProfileRepository";
import roles from "../../domain/roles";
import { PromiseEither, left, right } from "../../types/either";

type UpdatePlayerProfileRoleRequest = {
    uuid: string,
    applicator_uuid: string,
    role_id: number,
}

export default class UpdatePlayerProfileRole{
    constructor(
        private playerProfileRepository: IPlayerProfileRepository
    ){}
    async execute(data: UpdatePlayerProfileRoleRequest): PromiseEither<ILogError, null>{
        try{
            const profile = await this.playerProfileRepository.searchOne({
                uuid: data.uuid
            })
            if(!profile){
                return left(logErrorFactory(ErrorType.profile_not_founded))
            }

            const applicator_profile = await this.playerProfileRepository.searchOne({
                uuid: data.applicator_uuid
            })
            if(!applicator_profile){
                return left(logErrorFactory(ErrorType.target_profile_not_found))
            }

            if(!roles.isAdmin(applicator_profile.role)){
                return left(logErrorFactory(ErrorType.applicator_isnt_an_adm))
            }

            await this.playerProfileRepository.updateRole({
                player_uuid: data.uuid,
                role: data.role_id
            })

            return right(null)
        }catch(err){
            return left(logErrorFactory(ErrorType.generic, err))
        }
    }
}