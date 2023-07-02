import { isPunishmentWithDuration, isValidPunishment } from '../../domain/punishmentType'
import { Luisz576Db } from '../../services/database'
import mongoose from 'mongoose'

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

export interface IPunishment extends Required<IPunishmentSearchProps>, mongoose.Document{
    created_at: Date
    getRemainingTimeInSeconds(): number
    stillValid(): boolean
}

const PunishmentSchema = new mongoose.Schema({
    player_uuid: {
        type: String,
        required: true
    },
    applicator_uuid: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    punishment_type: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        default: ''
    },
    duration: {
        type: Number,
        default: 0,
        min: 0,
    },
    is_valid: {
        type: Boolean,
        default: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now,
        immutable: true
    },
})

PunishmentSchema.methods.getRemainingTimeInSeconds = function(): number{
    if(isPunishmentWithDuration(this.punishment_type)){
        const r = this.duration - Math.floor((Date.now() - this.created_at.getTime()) / 1000)
        if(r > 0){
            return r
        }
    }
    return 0
}

PunishmentSchema.methods.stillValid = function(): boolean{
    if(this.deleted || !this.is_valid){
        return false
    }
    return isValidPunishment(this.punishment_type, this.getRemainingTimeInSeconds())
}

export default Luisz576Db.model<IPunishment>('Punishment', PunishmentSchema)