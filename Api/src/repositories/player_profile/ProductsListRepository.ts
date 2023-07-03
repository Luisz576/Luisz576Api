import { IProductsList, IProductsListCreateProps, IProductsListSearchProps } from "../../domain/models/player_profile/ProductsList"
import ProductsList from "../../schemas/player_profile/ProductsList"
import { ReturnOrErrorPromise, left, right } from "../../types/either"

type IProductListOrError = ReturnOrErrorPromise<IProductsList>
type MaybeIProductListOrError = ReturnOrErrorPromise<IProductsList | null>

export default {
    async store(data: IProductsListCreateProps): IProductListOrError {
        try{
            const product_list = await ProductsList.create(data)
            if(product_list){
                return right(product_list)
            }else{
                return left("Can't create ProductList")
            }
        }catch(err){
            return left(err)
        }
    },
    async search(filter: IProductsListSearchProps): MaybeIProductListOrError{
        try{
            return right(await ProductsList.findOne(filter))
        }catch(err){
            return left(err)
        }
    },
    async searchById(id: string): MaybeIProductListOrError{
        try{
            return right(await ProductsList.findById(id))
        }catch(err){
            return left(err)
        }
    }
}