import { ErrorType } from "./error_type"

interface ILogErrorProps{
    id: ErrorType
    error_name: string
    error?: any
}

export interface ILogError extends ILogErrorProps{
    toJson(values?: any): any
}

class LogError implements ILogError{
    id: ErrorType
    error_name: string
    error?: any
    constructor(props: ILogErrorProps){
        this.id = props.id
        this.error_name = props.error_name
        this.error = props.error
    }
    toJson(values?: any){
        let json = {
            error_id: this.id,
            error_name: this.error_name,
        }
        if(values){
            Object.assign(json, values)
        }
        return json
    }
}

const errors = [
    new LogError({
        id: ErrorType.generic,
        error_name: "Generic"
    }),
    new LogError({
        id: ErrorType.profile_not_founded,
        error_name: "Profile not found"
    }),
    new LogError({
        id: ErrorType.target_profile_not_found,
        error_name: "Target profile not found"
    }),
    new LogError({
        id: ErrorType.incompatible_friend_invite_prefference,
        error_name: "Incompatible friend invite prefference",
    }),
    new LogError({
        id: ErrorType.players_are_already_friends,
        error_name: "Players are already friends",
    }),
    new LogError({
        id: ErrorType.players_arent_friends,
        error_name: "Players aren't friends",
    }),
    new LogError({
        id: ErrorType.friend_invite_already_sent,
        error_name: "Friend invite already sent",
    }),
    new LogError({
        id: ErrorType.no_valid_friend_invite_found,
        error_name: "No valid friend invite found",
    }),
    new LogError({
        id: ErrorType.applicator_isnt_an_adm,
        error_name: "Applicator isn't an ADM",
    }),
    new LogError({
        id: ErrorType.player_banned,
        error_name: "Player banned",
    }),
    new LogError({
        id: ErrorType.player_is_already_blocked,
        error_name: "Player is already blocked"
    }),
    new LogError({
        id: ErrorType.player_isnt_blocked,
        error_name: "Player isn't blocked"
    }),
]

export function logErrorFactory(id: ErrorType = ErrorType.generic, error?: any): ILogError{
    for(let err of errors){
        if(err.id == id){
            return new LogError({
                id,
                error_name: err.error_name,
                error
            })
        }
    }
    return new LogError({
        id: ErrorType.generic,
        error_name: "Generic",
        error
    })
}

export function logError(error: LogError, where: string, func: string){
    console.log(`Error '${error.error_name}' (${error.id}) at '${where}' -> '${func}':`)
    console.error(error.error)
}