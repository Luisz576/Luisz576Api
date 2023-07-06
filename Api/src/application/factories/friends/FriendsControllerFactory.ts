import friendsListRepository from "../../../repositories/friends/FriendsListRepository";
import playerProfileRepository from "../../../repositories/player_profile/PlayerProfileRepository";
import GetAllFriends from "../../../usecases/friends/GetAllFriends";
import RemoveFriend from "../../../usecases/friends/RemoveFriend";
import FriendsController from "../../controllers/friends/FriendsController";

export default function friendsControllerFactory(){
    return new FriendsController(
        new GetAllFriends(friendsListRepository),
        new RemoveFriend(friendsListRepository, playerProfileRepository)
    )
}