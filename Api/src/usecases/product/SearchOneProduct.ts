import { ErrorType } from "../../domain/errors/error_type";
import { ILogError, logErrorFactory } from "../../domain/errors/errors";
import { IProduct, IProductSearchProps } from "../../domain/models/product/Product";
import { IProductRepository } from "../../domain/repositories/product/ProductRepository";
import { Either, left, right } from "../../types/either";

export default class SearchOneProduct{
    constructor(
        private productsRepository: IProductRepository
    ){}

    async execute(data: IProductSearchProps): Promise<Either<ILogError, IProduct | null>>{
        try{
            return right(await this.productsRepository.search(data))
        }catch(err){
            return left(logErrorFactory(ErrorType.generic, err))
        }
    }
}