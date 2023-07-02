import { Luisz576Db } from "../../services/database"
import mongoose from "mongoose"

const ProductsListSchema = new mongoose.Schema({
    player_profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerProfile',
        required: true,
        immutable: true
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

export default Luisz576Db.model('ProductsList', ProductsListSchema)