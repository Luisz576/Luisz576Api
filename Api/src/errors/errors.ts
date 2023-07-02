interface LogErrorProps{
    id: number
    error_name: string
}

class LogError implements LogErrorProps{
    id: number
    error_name: string
    constructor({id, error_name}: LogErrorProps){
        this.id = id
        this.error_name = error_name
    }
    toJson(options?: {values: Object}){
        let json = {
            error_id: this.id,
            error_name: this.error_name,
        }
        if(options && options.values){
            Object.assign(json, options.values)
        }
        return json
    }
}

const errors = [
    new LogError({
        id: 10,
        error_name: "Profile not found"
    }),
    new LogError({
        id: 15,
        error_name: "Target profile not found"
    }),
    new LogError({
        id: 110,
        error_name: "Incompatible friend invite prefference",
    }),
    new LogError({
        id: 115,
        error_name: "Players are already friends",
    }),
    new LogError({
        id: 117,
        error_name: "Players aren't friends",
    }),
    new LogError({
        id: 120,
        error_name: "Friend invite already sent",
    }),
    new LogError({
        id: 125,
        error_name: "No valid friend invite found",
    }),
    new LogError({
        id: 210,
        error_name: "Applicator isn't a ADM",
    }),
    new LogError({
        id: 220,
        error_name: "Player banned",
    }),
]

export function getJsonError(id: number, options?: {values: Object}){
    for(let error of errors){
        if(error.id == id){
            return error.toJson(options)
        }
    }
    return undefined
}

export function logError(error: any, controller: string, action: string, func: string){
    console.log(`Error at '${controller}'.${action} -> '${func}':`)
    console.error(error)
    //TODO salvar log
}