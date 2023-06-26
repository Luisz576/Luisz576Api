const { PunishmentsDb } = require('../../services/database')
const mongoose = require('mongoose')

const PunishmentSchema = new mongoose.Schema({
    player_profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerProfile'
    },
    applicator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerProfile'
    },
    created: {
        type: Date,
        default: Date.now
    },
    comment: {
        type: String,
        default: ''
    },
    reason: String,
    punishment_type: Number,
    duration: Date
})

module.exports = PunishmentsDb.model('Punishment', PunishmentSchema)