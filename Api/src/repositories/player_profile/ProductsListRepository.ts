import ProductList, { IProductList, IProductListCreateProps } from "../../models/player_profile/ProductList"
import { Either, left, right } from "../../types/either"

type IProductListOrError = Promise<Either<any, IProductList>>

export default {
    async store(data: IProductListCreateProps): IProductListOrError {
        try{
            return right(await ProductList.create(data))
        }catch(err){
            return left(err)
        }
    }
}