const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    required: true,
    min_role: {
        type: Number,
        default: 0
    }
})

//module.exports = Luisz576Db.model('Product', ProductSchema)