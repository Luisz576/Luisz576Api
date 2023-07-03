export interface IProductsListCreateProps{
    player_uuid: string
}

export type IProductsListSearchProps = IProductsListCreateProps

export interface IProductItem{
    product: string
    timestamp?: Date
}
export interface IProductsList extends IProductsListCreateProps{
    products: IProductItem[]
}