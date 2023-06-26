const { PlayerProfileDb } = require('../../services/database')
const mongoose = require('mongoose')

const ProductsListSchema = new mongoose.Schema({
    player_profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerProfile',
        require: true
    },
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    }
})

module.exports = PlayerProfileDb.model('ProductsList', ProductsListSchema)