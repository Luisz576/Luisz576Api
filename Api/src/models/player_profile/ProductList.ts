import { Luisz576Db } from "../../services/database"
import mongoose from "mongoose"

export interface IProductListCreateProps{
    player_profile: mongoose.Schema.Types.ObjectId
}

export type IProductListSearchProps = IProductListCreateProps

interface IProduct{
    product: mongoose.Schema.Types.ObjectId
    timestamp: Date
}
export interface IProductList extends IProductListCreateProps, mongoose.Document{
    products: IProduct[]
}

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

export default Luisz576Db.model<IProductList>('ProductsList', ProductsListSchema)