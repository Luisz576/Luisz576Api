import playerProfileRepository from "../../../repositories/player_profile/PlayerProfileRepository";
import punishmentRepository from "../../../repositories/punishment/PunishmentRepository";
import GetAllPunishmentsOfPlayer from "../../../usecases/punishment/GetAllPunishmentsOfPlayer";
import GivePunishment from "../../../usecases/punishment/GivePunishment";
import PardonAllPunishmentsOfPlayer from "../../../usecases/punishment/PardonAllPunishmentsOfPlayer";
import PunishmentsController from "../../controllers/punishments/PunishmentsController";

export default function punishmentsControllerFactory(){
    return new PunishmentsController(
        new GivePunishment(punishmentRepository, playerProfileRepository),
        new PardonAllPunishmentsOfPlayer(punishmentRepository, playerProfileRepository),
        new GetAllPunishmentsOfPlayer(punishmentRepository, playerProfileRepository)
    )
}