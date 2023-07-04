import { IProduct, IProductSearchProps } from "../../domain/models/product/Product";
import { IProductRepository } from "../../domain/repositories/product/ProductRepository";
import { ReturnOrErrorPromise, left, right } from "../../types/either";

export class SearchOneProduct{
    constructor(
        private productsRepository: IProductRepository
    ){}

    async execute(data: IProductSearchProps): ReturnOrErrorPromise<IProduct | null>{
        try{
            return right(await this.productsRepository.search(data))
        }catch(err){
            return left(err)
        }
    }
}