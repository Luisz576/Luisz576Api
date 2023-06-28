const { getLanguageById } = require("../domain/languages");

module.exports = {
    validateLanguage(language){
        return getLanguageById(language, false)
    },
    validatePunishmentAndDuration(punishment_type, duration){
        return punishment_type == 1 || punishment_type == 3 ||
                (punishment_type == 2 && duration > 0)
    },
    validateUUID(uuid){
        const s = "" + uuid;
        return s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$') !== null
    },
    validateBoolean(bool){
        return bool === false || bool === true
    },
    validateEmail(email){
        return /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm.test(email);
    },
    // TODO
    validateDiscord(discord){
        return true;
    },
    validateTwitch(twitch){
        return true;
    },
    validateYoutube(youtube){
        return true;
    },
}