import Product, { IProduct, IProductCreateProps, IProductSearchProps } from "../../models/product/Product"
import { ReturnOrErrorPromise, left, right } from "../../types/either"

type IProductOrError = ReturnOrErrorPromise<IProduct>
type MaybeIProductOrError = ReturnOrErrorPromise<IProduct>

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