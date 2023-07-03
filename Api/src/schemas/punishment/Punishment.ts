import { IPunishment } from '../../domain/models/punishments/Punishment'
import { isPunishmentWithDuration, isValidPunishment } from '../../domain/punishmentType'
import { Luisz576Db } from '../../services/database'
import { Document, Schema } from 'mongoose'

const PunishmentSchema = new Schema<IPunishment>({
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

PunishmentSchema.methods.expires = function(){
    this.is_valid = false
}

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

export type IPunishmentModel = IPunishment & Document
export default Luisz576Db.model<IPunishmentModel>('Punishment', PunishmentSchema)