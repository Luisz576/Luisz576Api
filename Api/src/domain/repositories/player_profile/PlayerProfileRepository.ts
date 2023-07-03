import { OnlyExecutePromise, ReturnOrErrorPromise } from "../../../types/either"
import { IPlayerProfile, IPlayerProfileConfigs, IPlayerProfileCreateProps, IPlayerProfileSearchProps } from "../../models/player_profile/PlayerProfile"

export type IPlayerProfileOrErrorReturn<ID> = ReturnOrErrorPromise<IPlayerProfile<ID>>
export type MaybeIPlayerProfileOrErrorReturn<ID> = ReturnOrErrorPromise<IPlayerProfile<ID> | null>
export interface SessionProps{
    uuid: string
}
export interface UpdateRoleProps<ID>{
    player_profile: IPlayerProfile<ID>,
    role: number
}
export type IPlayerProfileConfigData = Partial<IPlayerProfileConfigs> & {
    uuid: string
}

export interface IPlayerProfileRepository<ID>{
    store(data: IPlayerProfileCreateProps): IPlayerProfileOrErrorReturn<ID>
    getById(player_profile_id: string): MaybeIPlayerProfileOrErrorReturn<ID>
    search(filter: IPlayerProfileSearchProps): MaybeIPlayerProfileOrErrorReturn<ID>
    session(session: SessionProps): OnlyExecutePromise
    updateConfigsAndSocial(data: IPlayerProfileConfigData): ReturnOrErrorPromise<boolean>
    updateRole(data: UpdateRoleProps<ID>): OnlyExecutePromise
}