import { IProductsList, IProductsListCreateProps } from "../../models/player_profile/ProductsList"

export interface IProductsListRepository{
    store(data: IProductsListCreateProps): Promise<IProductsList>
    getById(id: string): Promise<IProductsList | null>
    searchById(id: string): Promise<IProductsList | null>
}