import { IProductCreateProps, IProductSearchProps } from "../../domain/models/product/Product"
import { IProductRepository } from "../../domain/repositories/product/ProductRepository"
import Product, { IProductModel } from "../../schemas/product/Product"
import { ReturnOrErrorPromise, left, right } from "../../types/either"

export type IProductOrError = ReturnOrErrorPromise<IProductModel>
export type MaybeIProductOrError = ReturnOrErrorPromise<IProductModel | null>

class ProductsRepository implements IProductRepository{
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
    }
    async search(filter: IProductSearchProps): MaybeIProductOrError{
        try{
            return right(await Product.findOne(filter))
        }catch(err){
            return left(err)
        }
    }
}

const productsRepository = new ProductsRepository()

export default productsRepository