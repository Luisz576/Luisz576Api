import TheBridgeGame, { ITheBridgeGame, ITheBridgeGameCreateProps } from "../../../models/games/the_bridge/TheBridgeGame";
import { ReturnOrErrorPromise, left, right } from "../../../types/either";

type ITheBridgeGameOrError = ReturnOrErrorPromise<ITheBridgeGame>

export default {
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
    },
    async searchMatch(){

    },
    async searchMatches(){

    },
    async searchProfile(){

    }
}