const { logError } = require('../errors/errors')
const authenticator = require('../services/authenticator')

module.exports = (req, res, next) => {
    const { auth_token } = req.headers

    if(!auth_token){
        return res.sendStatus(401)
    }

    try{
        const tokenParts = auth_token.split('_')

        if(tokenParts.length !== 2){
            return res.sendStatus(401)
        }

        const [ requester, token ] = tokenParts
        const clientData = authenticator.getClientById(requester)

        if(!clientData){
            return res.sendStatus(401)
        }

        authenticator.verifyToken(token, (e, decoded) => {
            if(e){
                return res.sendStatus(401)
            }

            if(decoded.secret){
                if(decoded.secret == clientData.secret){
                    return next();
                }
            }
            return res.sendStatus(401)
        })
    }catch(e){
        logError(e, 'AuthenticationMiddleware', 'main') 
        return res.sendStatus(500)
    }
}