import { IProduct, IProductCreateProps, IProductSearchProps } from "../../models/product/Product"

export interface IProductRepository{
    store(data: IProductCreateProps): Promise<IProduct>
    search(filter: IProductSearchProps): Promise<IProduct | null>
}