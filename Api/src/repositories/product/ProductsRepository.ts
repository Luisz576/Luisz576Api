import Product, { IProduct, IProductCreateProps, IProductSearchProps } from "../../models/product/Product"
import { Either, left, right } from "../../types/either"

type IProductOrError = Promise<Either<any, IProduct | undefined>>

export default {
    async store(data: IProductCreateProps): IProductOrError{
        try{
            return right(await Product.create(data))
        }catch(err){
            return left(err)
        }
    },
    async search(filter: IProductSearchProps): IProductOrError{
        try{
            return right(await Product.findOne(filter))
        }catch(err){
            return left(err)
        }
    },
}