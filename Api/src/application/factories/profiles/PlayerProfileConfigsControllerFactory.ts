import playerProfileRepository from "../../../repositories/player_profile/PlayerProfileRepository";
import UpdateConfigsAndSocialOfPlayerProfile from "../../../usecases/player_profile/UpdateConfigsAndSocialOfPlayerProfile";
import UpdatePlayerProfileRole from "../../../usecases/player_profile/UpdatePlayerProfileRole";
import PlayerProfileConfigsController from "../../controllers/profiles/PlayerProfileConfigsController";

export default function playerProfileConfigsControllerFactory(){
    return new PlayerProfileConfigsController(
        new UpdateConfigsAndSocialOfPlayerProfile(playerProfileRepository),
        new UpdatePlayerProfileRole(playerProfileRepository)
    )
}