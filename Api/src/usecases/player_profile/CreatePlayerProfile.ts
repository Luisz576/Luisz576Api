import { IPlayerProfile } from "../../domain/models/player_profile/PlayerProfile";
import { IFriendsListRepository } from "../../domain/repositories/friends/FriendsListRepository";
import { IBlockListRepository } from "../../domain/repositories/player_profile/BlocksListRepository";
import { IPlayerProfileRepository } from "../../domain/repositories/player_profile/PlayerProfileRepository";
import { IProductsListRepository } from "../../domain/repositories/player_profile/ProductListRepository";
import { PromiseEither, left, right } from "../../types/either";

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
    async execute(data: CreatePlayerProfileRequest): PromiseEither<any, IPlayerProfile>{
        try{
            // player exists
            // uuid
            if(await this.playerProfileRepository.searchOne({
                uuid: data.uuid
            })){
                // TODO
                return left("")
            }
            // username
            if(await this.playerProfileRepository.searchOne({
                username: data.username
            })){
                // TODO
                return left("")
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
                block_list: ,
                friends_list: ,
                products_list: ,
            })
            return right(profile)
        }catch(err){
            return left(err)
        }
    }
}