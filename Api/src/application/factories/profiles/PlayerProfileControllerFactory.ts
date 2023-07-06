import friendListRepository from "../../../repositories/friends/FriendsListRepository";
import blockListRepository from "../../../repositories/player_profile/BlockListRepository";
import playerProfileRepository from "../../../repositories/player_profile/PlayerProfileRepository";
import productsListRepository from "../../../repositories/player_profile/ProductsListRepository";
import CreatePlayerProfile from "../../../usecases/player_profile/CreatePlayerProfile";
import GetPlayerProfileByUUID from "../../../usecases/player_profile/GetPlayerProfileByUUID";
import MakePlayerProfileSession from "../../../usecases/player_profile/MakePlayerProfileSession";
import PlayerProfileController from "../../controllers/profiles/PlayerProfileController";

export default function playerProfileControllerFactory(){
    return new PlayerProfileController(
        new CreatePlayerProfile(playerProfileRepository, blockListRepository, friendListRepository, productsListRepository),
        new GetPlayerProfileByUUID(playerProfileRepository),
        new MakePlayerProfileSession(playerProfileRepository)
    )
}