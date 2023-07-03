import { ReturnOrErrorPromise } from "../../../types/either"
import { IProductsList, IProductsListCreateProps, IProductsListSearchProps } from "../../models/player_profile/ProductsList"

type IProductListOrError = ReturnOrErrorPromise<IProductsList>
type MaybeIProductListOrError = ReturnOrErrorPromise<IProductsList | null>

export interface IProductsListRepository{
    store(data: IProductsListCreateProps): IProductListOrError
    search(filter: IProductsListSearchProps): MaybeIProductListOrError
    searchById(id: string): MaybeIProductListOrError
}