import { Document, Schema } from "mongoose"

export interface IProductsListCreateProps{
    player_profile: Schema.Types.ObjectId
}

export type IProductsListSearchProps = IProductsListCreateProps

export interface IProductItem{
    product: Schema.Types.ObjectId
    timestamp?: Date
}
export interface IProductsList extends IProductsListCreateProps, Document{
    products: IProductItem[]
}