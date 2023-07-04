import { IProduct, IProductCreateProps } from "../../domain/models/product/Product";
import { IProductRepository } from "../../domain/repositories/product/ProductRepository";
import { ReturnOrErrorPromise, left, right } from "../../types/either";

export class CreateProduct{
    constructor(
        private productsRepository: IProductRepository
    ){}

    async execute(data: IProductCreateProps): ReturnOrErrorPromise<IProduct>{
        try{
            return right(await this.productsRepository.store(data))
        }catch(err){
            return left(err)
        }
    }
}