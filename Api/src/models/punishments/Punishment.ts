import { isPunishmentWithDuration, isValidPunishment } from '../../domain/punishmentType'
import { Luisz576Db } from '../../services/database'
import mongoose from 'mongoose'

const PunishmentSchema = new mongoose.Schema({
    player_profile: {
        type: String,
        required: true
    },
    applicator_profile: {
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
    created: {
        type: Date,
        default: Date.now
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