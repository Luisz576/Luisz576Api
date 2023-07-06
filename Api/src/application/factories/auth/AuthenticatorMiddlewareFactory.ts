import AuthenticateToken from "../../../usecases/auth/AuthenticateToken";
import AuthenticatorMiddleware from "../../middlewares/AuthenticatorMiddleware";

export default function authenticatorMiddlewareFactory(){
    return new AuthenticatorMiddleware(
        new AuthenticateToken()
    )
}