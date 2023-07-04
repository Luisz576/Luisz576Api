import { IPunishment, IPunishmentCreateProps, IPunishmentSearchProps } from "../../models/punishments/Punishment"

export interface IPunishmentRepository{
    store(data: IPunishmentCreateProps): Promise<IPunishment>
    search(filter: IPunishmentSearchProps): Promise<IPunishment[]>
    pardonAllOfPlayer(player_uuid: string): Promise<void>
}