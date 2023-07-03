import { IProductsList } from "../../domain/models/player_profile/ProductsList"
import { Luisz576Db } from "../../services/database"
import { Schema } from "mongoose"

const ProductsListSchema = new Schema({
    player_profile: {
        type: Schema.Types.ObjectId,
        ref: 'PlayerProfile',
        required: true,
        immutable: true
    },
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
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

export default Luisz576Db.model<IProductsList>('ProductsList', ProductsListSchema)