const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    id: Number,
    price: Number,
    min_role: {
        type: Number,
        default: 0
    }
})

//module.exports = ProductDb.model('Product', ProductSchema)