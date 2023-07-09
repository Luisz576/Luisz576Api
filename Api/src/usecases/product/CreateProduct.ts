import { ErrorType } from "../../domain/errors/error_type";
import { ILogError, logErrorFactory } from "../../domain/errors/errors";
import { IProduct, IProductCreateProps } from "../../domain/models/product/Product";
import { IProductRepository } from "../../domain/repositories/product/ProductRepository";
import { PromiseEither, left, right } from "../../types/either";

export default class CreateProduct{
    constructor(
        private productsRepository: IProductRepository
    ){}

    async execute(data: IProductCreateProps): PromiseEither<ILogError, IProduct>{
        try{
            return right(await this.productsRepository.store(data))
        }catch(err){
            return left(logErrorFactory(ErrorType.generic, err))
        }
    }
}