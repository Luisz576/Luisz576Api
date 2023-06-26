const { Luisz576Db } = require('../../services/database')
const mongoose = require('mongoose')

const ProductsListSchema = new mongoose.Schema({
    player_profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerProfile',
        require: true
    },
    products: {
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }],
        default: []
    }
})

module.exports = Luisz576Db.model('ProductsList', ProductsListSchema)