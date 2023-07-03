import { ITheBridgeProfileRepository } from "../../../domain/repositories/games/the_bridge/TheBridgeProfileRepository";

class TheBridgeProfileRepository implements ITheBridgeProfileRepository{
    store(){}
    updateProfileUsingMatch(){}
    searchMatches(){}
    search(){}
}

const theBridgeProfileRepository = new TheBridgeProfileRepository()

export default theBridgeProfileRepository