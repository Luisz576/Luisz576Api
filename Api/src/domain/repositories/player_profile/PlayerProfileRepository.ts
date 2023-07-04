import { IPlayerProfile, IPlayerProfileConfigs, IPlayerProfileCreateProps, IPlayerProfileSearchProps } from "../../models/player_profile/PlayerProfile"

export type SearchByProfileIdRequest = {
    uuid: string
}
export type UpdateRoleRequest<ID> = {
    player_profile: IPlayerProfile<ID>,
    role: number
}
export type UpdatePlayerProfileConfigRequest = Partial<IPlayerProfileConfigs> & {
    uuid: string
}

export interface IPlayerProfileRepository<ID>{
    store(data: IPlayerProfileCreateProps): Promise<IPlayerProfile<ID>>
    searchOne(filter: IPlayerProfileSearchProps): Promise<IPlayerProfile<ID> | null>
    updateConfigsAndSocial(data: UpdatePlayerProfileConfigRequest): Promise<void>
    session(session: SearchByProfileIdRequest): Promise<void>
    updateRole(data: UpdateRoleRequest<ID>): Promise<void>
    setHasPunishment(data: SearchByProfileIdRequest): Promise<void>
}