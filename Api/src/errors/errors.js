class Error{
    constructor({id, error_name}){
        this.id = id
        this.error_name = error_name
    }
    toJson(options = {values}){
        let json = {
            error_id: this.id,
            error_name: this.error_name,
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
    new Error({
        id: 10,
        error_name: "Profile not found"
    }),
    new Error({
        id: 15,
        error_name: "Target profile not found"
    }),
    new Error({
        id: 110,
        error_name: "Incompatible friend invite prefference",
    }),
    new Error({
        id: 115,
        error_name: "Players are already friends",
    }),
    new Error({
        id: 117,
        error_name: "Players aren't friends",
    }),
    new Error({
        id: 120,
        error_name: "Friend invite already sent",
    }),
    new Error({
        id: 125,
        error_name: "No valid friend invite found",
    }),
    new Error({
        id: 210,
        error_name: "Applicator isn't a ADM",
    })
]

module.exports = {
    getJsonError(id, options = { values: {} }){
        for(let i in errors){
            if(errors[i].id == id){
                return errors[i].toJson({values: options.values})
            }
        }
        return undefined
    },
    logError(error){
        console.error(error)
        //TODO salvar log
    }
}