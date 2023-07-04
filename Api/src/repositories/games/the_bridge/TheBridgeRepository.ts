import { Schema } from "mongoose";
import { ITheBridgeGameCreateProps, ITheBridgeGameSearchProps } from "../../../domain/models/games/the_bridge/TheBridgeGame";
import { ITheBridgeRepository } from "../../../domain/repositories/games/the_bridge/TheBridgeRepository";
import TheBridgeGame, { ITheBridgeGameModel } from "../../../schemas/games/the_bridge/TheBridgeGame";

class TheBridgeRepository implements ITheBridgeRepository<Schema.Types.ObjectId>{
    async store(data: ITheBridgeGameCreateProps): Promise<ITheBridgeGameModel>{
        const the_bridge_game = await TheBridgeGame.create(data)
        if(the_bridge_game){
            return the_bridge_game
        }
        throw new Error("Can't create TheBridgeGame")
    }
    async searchMatch(filter: ITheBridgeGameSearchProps): Promise<ITheBridgeGameModel | null>{
        return await TheBridgeGame.findOne(filter)
    }
    async searchMatches(filter: ITheBridgeGameSearchProps): Promise<ITheBridgeGameModel[]>{
        return await TheBridgeGame.find(filter)
    }
}

const theBridgeRepository = new TheBridgeRepository()

export default theBridgeRepository