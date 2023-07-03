import { IProductsList } from "../../domain/models/player_profile/ProductsList"
import { Luisz576Db } from "../../services/database"
import { Document, Schema } from "mongoose"

const ProductsListSchema = new Schema<IProductsList>({
    player_uuid: {
        type: String,
        required: true,
        immutable: true
    },
    products: {
        type: [{
            product_name: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }],
        default: []
    }
})

export type IProductsListModel = IProductsList & Document
export default Luisz576Db.model<IProductsListModel>('ProductsList', ProductsListSchema)