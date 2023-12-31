import { ErrorType } from "../../domain/errors/error_type"
import { ILogError, logErrorFactory } from "../../domain/errors/errors"
import { IBlockedPlayer } from "../../domain/models/player_profile/BlocksList"
import { IBlockListRepository } from "../../domain/repositories/player_profile/BlocksListRepository"
import { IPlayerProfileRepository } from "../../domain/repositories/player_profile/PlayerProfileRepository"
import { Either, left, right } from "../../types/either"

type GetBlockedPlayersOfPlayerProfileResponse = {
    uuid: string
}

export default class GetBlockedPlayersOfPlayerProfile{
    constructor(
        private blockList: IBlockListRepository,
        private playerProfileRepository: IPlayerProfileRepository
    ){}
    async execute(data: GetBlockedPlayersOfPlayerProfileResponse): Promise<Either<ILogError, IBlockedPlayer[]>>{
        try{
            const profile = await this.playerProfileRepository.searchOne({
                uuid: data.uuid
            })

            if(!profile){
                return left(logErrorFactory(ErrorType.profile_not_founded))
            }

            const block_list = await this.blockList.getById(profile.block_list)
            
            if(!block_list){
                return left(logErrorFactory(ErrorType.generic, `Blocklist not found (${profile.block_list})`))
            }

            const blocks: IBlockedPlayer[] = []

            for(let b of block_list.blocked_players){
                if(b.is_blocked){
                    blocks.push(b)
                }
            }

            return right(blocks)
        }catch(err){
            return left(logErrorFactory(ErrorType.generic, err))
        }
    }
}