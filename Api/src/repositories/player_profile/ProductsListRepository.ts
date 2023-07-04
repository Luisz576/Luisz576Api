import { IProductsListCreateProps, IProductsListSearchProps } from "../../domain/models/player_profile/ProductsList"
import { IProductsListRepository } from "../../domain/repositories/player_profile/ProductListRepository"
import ProductsList, { IProductsListModel } from "../../schemas/player_profile/ProductsList"

class ProductsListRepository implements IProductsListRepository{
    async store(data: IProductsListCreateProps): Promise<IProductsListModel> {
        const product_list = await ProductsList.create(data)
        if(product_list){
            return product_list
        }
        throw new Error("Can't create ProductList")
    }
    async search(filter: IProductsListSearchProps): Promise<IProductsListModel | null>{
        return await ProductsList.findOne(filter)
    }
    async searchById(id: string): Promise<IProductsListModel | null>{
        return await ProductsList.findById(id)
    }
}

const productsListRepository = new ProductsListRepository()

export default productsListRepository