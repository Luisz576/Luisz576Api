import { isPunishmentWithDuration, isValidPunishment } from '../../domain/punishmentType'
import { Luisz576Db } from '../../services/database'
import mongoose from 'mongoose'
import { IPlayerProfile } from '../player_profile/PlayerProfile'

export interface IPunishmentCreateProps{
    player_profile: IPlayerProfile,
    applicator_uuid: string
    reason: string
    punishment_type: number,
    comment?: string
    duration?: number
}

export interface IPunishment{
    player_uuid: string,
    applicator_uuid: string
    reason: string
    punishment_type: number,
    comment: string
    duration: number
    is_valid: boolean
    deleted: boolean
    created_at: Date
}

const PunishmentSchema = new mongoose.Schema<IPunishment>({
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

PunishmentSchema.methods.getRemainingTimeInSeconds = function(){
    if(isPunishmentWithDuration(this.punishment_type)){
        const r = this.duration - Math.floor((Date.now() - this.created.getTime()) / 1000)
        if(r > 0){
            return r
        }
    }
    return 0
}

PunishmentSchema.methods.stillValid = function(){
    if(this.deleted || !this.is_valid){
        return false
    }
    return isValidPunishment(this.punishment_type, this.getRemainingTimeInSeconds())
}

export default Luisz576Db.model('Punishment', PunishmentSchema)