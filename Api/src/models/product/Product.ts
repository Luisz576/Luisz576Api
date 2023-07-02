import { Luisz576Db } from "../../services/database"
import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
    product_id: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    icon_item: {
        type: String,
        required: true
    },
    description: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: Number,
        min: 0,
        required: true
    },
    rarity: {
        type: Number,
        min: 0,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    min_role: {
        type: Number,
        min: 0,
        required: true
    }
})

export default Luisz576Db.model('Product', ProductSchema)