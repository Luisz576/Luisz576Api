const authenticator = require('../../services/authenticator')

module.exports = {
    async store(req, res){
        const { client_secret } = req.body
        if(client_secret){
            const token = authenticator.generateAplicationTokenByClientSecret(client_secret)
            if(token){
                return res.json({
                    status: 200,
                    token
                })
            }
        }
        return res.sendStatus(400)
    }
}