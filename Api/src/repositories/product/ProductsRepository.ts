import { IProductCreateProps, IProductSearchProps } from "../../domain/models/product/Product"
import { IProductRepository } from "../../domain/repositories/product/ProductRepository"
import Product, { IProductModel } from "../../schemas/product/Product"

class ProductsRepository implements IProductRepository{
    async store(data: IProductCreateProps): Promise<IProductModel>{
        const product = await Product.create(data)
        if(product){
            return product
        }
        throw new Error("Can't create product")
    }
    async search(filter: IProductSearchProps): Promise<IProductModel | null>{
        return await Product.findOne(filter)
    }
}

const productsRepository = new ProductsRepository()

export default productsRepository