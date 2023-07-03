import { OnlyExecutePromise, ReturnOrErrorPromise } from "../../../types/either"
import { IPunishment, IPunishmentCreateProps, IPunishmentSearchProps } from "../../models/punishments/Punishment"

export type IPunishmentOrError = ReturnOrErrorPromise<IPunishment>
export type MaybeIPunishmentOrError = ReturnOrErrorPromise<IPunishment | null>
export type IPunishmentsOrError = ReturnOrErrorPromise<IPunishment[]>

export interface IPunishmentRepository{
    store(data: IPunishmentCreateProps): IPunishmentOrError
    getById(punishment_id: string): MaybeIPunishmentOrError
    search(filter: IPunishmentSearchProps): IPunishmentsOrError
    pardon(data: {punishment?: IPunishment, punishment_id?: string}): OnlyExecutePromise
    pardonAllOfPlayer(player_uuid: string): OnlyExecutePromise
}