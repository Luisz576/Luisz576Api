import blockListRepository from "../../../repositories/player_profile/BlockListRepository";
import playerProfileRepository from "../../../repositories/player_profile/PlayerProfileRepository";
import BlockPlayerProfile from "../../../usecases/player_profile/BlockPlayerProfile";
import GetBlockedPlayersOfPlayerProfile from "../../../usecases/player_profile/GetBlockedPlayersOfPlayerProfile";
import UnblockPlayerProfile from "../../../usecases/player_profile/UnblockPlayerProfile";
import BlocksController from "../../controllers/blocks/BlocksController";

export default function blocksControllerFactory(){
    return new BlocksController(
        new BlockPlayerProfile(blockListRepository, playerProfileRepository),
        new UnblockPlayerProfile(blockListRepository, playerProfileRepository),
        new GetBlockedPlayersOfPlayerProfile(blockListRepository, playerProfileRepository)
    )
}