import {isValidBan} from "../domain/punishmentType";

export default {
    validatePunishmentAndDuration(type: number, duration?: number): boolean{
        return type == 1 || isValidBan(type, duration)
    },
    validateUUID(uuid: any): boolean{
        const s = "" + uuid
        return s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$') !== null
    },
    validateEmail(email: string): boolean{
        return /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm.test(email);
    },
    validateBoolean(bool: any): boolean{
        return bool === false || bool === true
    },
    validateString(s: any): boolean{
        return typeof(s) == 'string' && s != null
    }
}