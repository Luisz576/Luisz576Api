import punishment_type from "../domain/punishment_type";

export default {
    validatePunishmentAndDuration(type: number, duration?: number){
        return type == 1 || punishment_type.isValidBan(type, duration)
    },
    validateUUID(uuid: string){
        const s = "" + uuid;
        return s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$') !== null
    },
    validateEmail(email: string){
        return /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm.test(email);
    },
}