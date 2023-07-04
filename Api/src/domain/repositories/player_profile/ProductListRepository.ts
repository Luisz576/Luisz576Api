import { IProductsList, IProductsListCreateProps, IProductsListSearchProps } from "../../models/player_profile/ProductsList"

export interface IProductsListRepository{
    store(data: IProductsListCreateProps): Promise<IProductsList>
    search(filter: IProductsListSearchProps): Promise<IProductsList | null>
    searchById(id: string): Promise<IProductsList | null>
}