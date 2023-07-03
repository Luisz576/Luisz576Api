import { IProduct } from "../../domain/models/product/Product"
import { Luisz576Db } from "../../services/database"
import { Document, Schema } from "mongoose"

const ProductSchema = new Schema<IProduct>({
    name: {
        type: String,
        unique: true,
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
    min_role: {
        type: Number,
        min: 0,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    },
})

export type IProductModel = IProduct & Document
export default Luisz576Db.model<IProductModel>('Product', ProductSchema)