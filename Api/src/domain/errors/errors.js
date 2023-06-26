const { getLanguageById } = require('../languages')
const messages = require('../messages/messages.json')

class Error{
    constructor({id, error_name, message_error}){
        this.id = id
        this.error_name = error_name
        this.message_error = message_error
    }
    toJson(options = {values, languageId}){
        let json = {
            error_id: this.id,
            error_name: this.error_name,
        }
        if(this.message_error){
            json['message_error'] = this.message_error[options ? getLanguageById(options.languageId) : 0]
        }
        if(options && options.values){
            for(let i in options.values){
                json[i] = options.values[i]
            }
        }
        return json
    }
}

const errors = [
    // Without messages
    new Error({
        id: 10,
        error_name: "Profile not finded"
    }),
    new Error({
        id: 15,
        error_name: "Target profile not finded"
    }),
    // With messages
    new Error({
        id: 110,
        error_name: "Incompatible friend invite prefference",
        message_error: messages.friend_invite_request_not_allowed
    })
]

module.exports = {
    getJsonError(id, options = { values: {}, languageId: 0 }){
        for(let i in errors){
            if(errors[i].id == id){
                return errors[i].toJson({values: options.values, languageId: options.languageId})
            }
        }
        return undefined
    },
    // Errors
    errors,
    Error
}