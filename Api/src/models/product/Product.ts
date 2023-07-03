import { Luisz576Db } from "../../services/database"
import { Schema, Document } from "mongoose"

export interface IProductCreateProps{
    name: string
    icon_item: string
    description: string[]
    price: number
    category: number
    rarity: number
    min_role?: number
}

export interface IProduct extends Required<IProductCreateProps>, Document{
    created_at: Date
}

export type IProductSearchProps = Partial<IProductCreateProps>

const ProductSchema = new Schema({
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

export default Luisz576Db.model<IProduct>('Product', ProductSchema)