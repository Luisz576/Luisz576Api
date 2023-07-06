import friendInviteRepository from "../../../repositories/friends/FriendInviteRepository";
import friendsListRepository from "../../../repositories/friends/FriendsListRepository";
import playerProfileRepository from "../../../repositories/player_profile/PlayerProfileRepository";
import AcceptFriendInvite from "../../../usecases/friends/AcceptFriendInvite";
import CreateFriendInvite from "../../../usecases/friends/CreateFriendInvite";
import GetAllFriendInvitesOfPlayerProfile from "../../../usecases/friends/GetAllFriendInvitesOfPlayerProfile";
import FriendInvitesController from "../../controllers/friends/FriendInvitesController";

export default function friendInvitesControllerFactory(){
    return new FriendInvitesController(
        new CreateFriendInvite(friendInviteRepository, playerProfileRepository),
        new GetAllFriendInvitesOfPlayerProfile(friendInviteRepository),
        new AcceptFriendInvite(friendInviteRepository, friendsListRepository, playerProfileRepository)
    )
}