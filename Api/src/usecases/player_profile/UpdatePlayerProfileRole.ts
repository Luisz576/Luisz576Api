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
    async execute(data: UpdatePlayerProfileRoleRequest): PromiseEither<any, null>{
        try{
            const profile = await this.playerProfileRepository.searchOne({
                uuid: data.uuid
            })
            if(!profile){
                // TODO
                return left("")
            }

            const applicator_profile = await this.playerProfileRepository.searchOne({
                uuid: data.applicator_uuid
            })
            if(!applicator_profile){
                // TODO
                return left("")
            }

            if(!roles.isAdmin(applicator_profile.role)){
                // TODO
                return left("")
            }

            await this.playerProfileRepository.updateRole({
                player_uuid: data.uuid,
                role: data.role_id
            })

            return right(null)
        }catch(err){
            return left(err)
        }
    }
}