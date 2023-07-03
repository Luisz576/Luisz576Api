import { Schema } from "mongoose";
import { ITheBridgeGameCreateProps, ITheBridgeGameSearchProps } from "../../../domain/models/games/the_bridge/TheBridgeGame";
import { ITheBridgeRepository } from "../../../domain/repositories/games/the_bridge/TheBridgeRepository";
import TheBridgeGame, { ITheBridgeGameModel } from "../../../schemas/games/the_bridge/TheBridgeGame";
import { ReturnOrErrorPromise, left, right } from "../../../types/either";

type ITheBridgeGameOrError = ReturnOrErrorPromise<ITheBridgeGameModel>
type MaybeITheBridgeGameOrError = ReturnOrErrorPromise<ITheBridgeGameModel | null>
type ITheBridgeGamesOrError = ReturnOrErrorPromise<ITheBridgeGameModel[]>

class TheBridgeRepository implements ITheBridgeRepository<Schema.Types.ObjectId>{
    async store(data: ITheBridgeGameCreateProps): ITheBridgeGameOrError{
        try{
            const the_bridge_game = await TheBridgeGame.create(data)
            if(the_bridge_game){
                return right(the_bridge_game)
            }
            return left("Can't create TheBridgeGame")
        }catch(err){
            return left(err)
        }
    }
    async searchMatch(filter: ITheBridgeGameSearchProps): MaybeITheBridgeGameOrError{
        try{
            return right(await TheBridgeGame.findOne(filter))
        }catch(err){
            return left(err)
        }
    }
    async searchMatches(filter: ITheBridgeGameSearchProps): ITheBridgeGamesOrError{
        try{
            return right(await TheBridgeGame.find(filter))
        }catch(err){
            return left(err)
        }
    }
}

const theBridgeRepository = new TheBridgeRepository()

export default theBridgeRepository