const { getLanguageById } = require("../domain/languages");

module.exports = {
    //TODO
    validateLanguage(language){
        return getLanguageById(language, false)
    },
    validatePunishmentAndDuration(punishment_type, duration){
        return punishment_type == 1 || punishment_type == 3 ||
                (punishment_type == 2 && duration > 0)
    },
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