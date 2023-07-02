import ProductList, { IProductList, IProductListCreateProps, IProductListSearchProps } from "../../models/player_profile/ProductList"
import { ReturnOrErrorPromise, left, right } from "../../types/either"

type IProductListOrError = ReturnOrErrorPromise<IProductList>
type MaybeIProductListOrError = ReturnOrErrorPromise<IProductList | null>

export default {
    async store(data: IProductListCreateProps): IProductListOrError {
        try{
            const product_list = await ProductList.create(data)
            if(product_list){
                return right(product_list)
            }else{
                return left("Can't create ProductList")
            }
        }catch(err){
            return left(err)
        }
    },
    async search(filter: IProductListSearchProps): MaybeIProductListOrError{
        try{
            return right(await ProductList.findOne(filter))
        }catch(err){
            return left(err)
        }
    },
    async searchById(id: string): MaybeIProductListOrError{
        try{
            return right(await ProductList.findById(id))
        }catch(err){
            return left(err)
        }
    }
}