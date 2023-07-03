import { ReturnOrErrorPromise } from "../../../types/either"
import { IProduct, IProductCreateProps, IProductSearchProps } from "../../models/product/Product"

export type IProductOrError = ReturnOrErrorPromise<IProduct>
export type MaybeIProductOrError = ReturnOrErrorPromise<IProduct | null>

export interface IProductRepository{
    store(data: IProductCreateProps): IProductOrError
    search(filter: IProductSearchProps): MaybeIProductOrError
}