import { Document } from "mongoose"

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