const { getLanguageById } = require("../domain/languages");

module.exports = {
    validateFriendInvitePrefference(prefference){
        return prefference === false || prefference === true
    },
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
    //TODO
    validateEmail(email){
        return true;
    },
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