const { getLanguageById } = require("../domain/languages");

module.exports = {
    //TODO
    validateLanguage(language){
        return getLanguageById(language, false)
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