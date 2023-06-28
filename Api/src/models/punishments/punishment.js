const { Luisz576Db } = require('../../services/database')
const mongoose = require('mongoose')

const PunishmentSchema = new mongoose.Schema({
    //TODO atualizar ObjectId por UUID e remover _profile dos nomes
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
    created: {
        type: Date,
        default: Date.now
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
    deleted: {
        type: Boolean,
        default: false
    }
})

module.exports = Luisz576Db.model('Punishment', PunishmentSchema)