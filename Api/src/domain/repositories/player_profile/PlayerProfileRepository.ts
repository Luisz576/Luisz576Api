import { IPlayerProfile, IPlayerProfileConfigs, IPlayerProfileCreateProps, IPlayerProfileSearchProps } from "../../models/player_profile/PlayerProfile"

export type SearchByProfileIdRequest = {
    uuid: string
}
export type UpdateRoleRequest = {
    player_profile: IPlayerProfile,
    role: number
}
export type UpdatePlayerProfileConfigRequest = Partial<IPlayerProfileConfigs> & {
    uuid: string
}

export interface IPlayerProfileRepository{
    store(data: IPlayerProfileCreateProps): Promise<IPlayerProfile>
    searchOne(filter: IPlayerProfileSearchProps): Promise<IPlayerProfile | null>
    updateConfigsAndSocial(data: UpdatePlayerProfileConfigRequest): Promise<void>
    session(session: SearchByProfileIdRequest): Promise<void>
    updateRole(data: UpdateRoleRequest): Promise<void>
    setHasPunishment(data: SearchByProfileIdRequest): Promise<void>
}