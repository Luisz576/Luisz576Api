import AuthenticationController from "../../controllers/auth/AuthenticationController"

export default function authenticationControllerFactory(){
    return new AuthenticationController()
}