import { ErrorType } from "../../domain/errors/error_type";
import { ILogError, logErrorFactory } from "../../domain/errors/errors";
import { IPlayerProfile } from "../../domain/models/player_profile/PlayerProfile";
import { IFriendsListRepository } from "../../domain/repositories/friends/FriendsListRepository";
import { IBlockListRepository } from "../../domain/repositories/player_profile/BlocksListRepository";
import { IPlayerProfileRepository } from "../../domain/repositories/player_profile/PlayerProfileRepository";
import { IProductsListRepository } from "../../domain/repositories/player_profile/ProductListRepository";
import { Either, left, right } from "../../types/either";

type CreatePlayerProfileRequest = {
    uuid: string,
    username: string
}

export default class CreatePlayerProfile{
    constructor(
        private playerProfileRepository: IPlayerProfileRepository,
        private blockListRepository: IBlockListRepository,
        private friendListRepository: IFriendsListRepository,
        private productListRepository: IProductsListRepository
    ){}
    async execute(data: CreatePlayerProfileRequest): Promise<Either<ILogError, IPlayerProfile>>{
        try{
            // player exists
            // uuid
            if(await this.playerProfileRepository.searchOne({
                uuid: data.uuid
            })){
                return left(logErrorFactory(ErrorType.profile_exists))
            }
            // username
            if(await this.playerProfileRepository.searchOne({
                username: data.username
            })){
                return left(logErrorFactory(ErrorType.profile_exists))
            }
            // create block_list
            const block_list = await this.blockListRepository.store({
                player_uuid: data.uuid
            })
            // create friends_list
            const friends_list = await this.friendListRepository.store({
                player_uuid: data.uuid
            })
            // create products_list
            const products_list = await this.productListRepository.store({
                player_uuid: data.uuid
            })
            // create
            const profile = await this.playerProfileRepository.store({
                uuid: data.uuid,
                username: data.username,
                block_list: block_list._id,
                friends_list: friends_list._id,
                products_list: products_list._id,
            })
            return right(profile)
        }catch(err){
            return left(logErrorFactory(ErrorType.generic, err))
        }
    }
}