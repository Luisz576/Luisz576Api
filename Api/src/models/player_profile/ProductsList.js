const mongoose = require('mongoose')

const ProductsListSchema = new mongoose.Schema({
    player_profile: mongoose.Schema.Types.ObjectId,
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    }
})

//module.exports = ProductsListDb.model('ProductsList', ProductsListSchema)