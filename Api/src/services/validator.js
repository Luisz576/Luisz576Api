const { getLanguageById } = require("../domain/Languages");
const { isValidBan } = require("../domain/PunishmentType");

module.exports = {
    validateLanguage(language){
        return getLanguageById(language, false)
    },
    validatePunishmentAndDuration(punishment_type, duration){
        return punishment_type == 1 || isValidBan(punishment_type, duration)
    },
    validateUUID(uuid){
        const s = "" + uuid;
        return s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$') !== null
    },
    validateBoolean(bool){
        return bool === false || bool === true
    },
    validateString(string){
        return string !== undefined && string !== null
    },
    validateEmail(email){
        return /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm.test(email);
    },
}