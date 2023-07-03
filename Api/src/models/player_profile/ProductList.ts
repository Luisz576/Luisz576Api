import { Luisz576Db } from "../../services/database"
import { Schema, Document } from "mongoose"

export interface IProductListCreateProps{
    player_profile: Schema.Types.ObjectId
}

export type IProductListSearchProps = IProductListCreateProps

export interface IProduct{
    product: Schema.Types.ObjectId
    timestamp?: Date
}
export interface IProductList extends IProductListCreateProps, Document{
    products: IProduct[]
}

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

export default Luisz576Db.model<IProductList>('ProductsList', ProductsListSchema)