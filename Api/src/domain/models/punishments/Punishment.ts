import { Document } from 'mongoose'

export interface IPunishmentCreateProps{
    player_uuid: string,
    applicator_uuid: string
    reason: string
    punishment_type: number,
    comment?: string
    duration?: number
}

export type IPunishmentSearchProps = Partial<IPunishmentCreateProps> & {
    is_valid?: boolean
    deleted?: boolean
}

export interface IPunishment extends Required<IPunishmentSearchProps>, Document{
    created_at: Date
    expires(): void
    getRemainingTimeInSeconds(): number
    stillValid(): boolean
}