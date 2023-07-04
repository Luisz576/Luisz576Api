import { IPlayerProfile, IPlayerProfileConfigs, IPlayerProfileCreateProps, IPlayerProfileSearchProps } from "../../models/player_profile/PlayerProfile"

export type UpdateRoleRequest = {
    player_uuid: string,
    role: number
}

export interface IPlayerProfileRepository{
    store(data: IPlayerProfileCreateProps): Promise<IPlayerProfile>
    searchOne(filter: IPlayerProfileSearchProps): Promise<IPlayerProfile | null>
    updateConfigsAndSocial(uuid: string, data: Partial<IPlayerProfileConfigs>): Promise<void>
    session(uuid: string): Promise<void>
    updateRole(data: UpdateRoleRequest): Promise<void>
    setHasPunishment(uuid: string): Promise<void>
}