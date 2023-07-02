import Product, { IProduct, IProductCreateProps, IProductSearchProps } from "../../models/product/Product"
import { Either, left, right } from "../../types/either"

type IProductOrError = Promise<Either<any, IProduct>>
type MaybeIProductOrError = Promise<Either<any, IProduct>>

export default {
    async store(data: IProductCreateProps): IProductOrError{
        try{
            const product = await Product.create(data)
            if(product){
                return right(product)
            }
            return left("Can't create product")
        }catch(err){
            return left(err)
        }
    },
    async search(filter: IProductSearchProps): MaybeIProductOrError{
        try{
            return right(await Product.findOne(filter))
        }catch(err){
            return left(err)
        }
    },
}