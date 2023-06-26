module.exports = {
    getLanguageById(id, defaultReturn = 'en'){
        switch(id){
            case 0:
                return 'en'
            case 1:
                return 'pt'
            case 2:
                return 'es'
        }
        return defaultReturn
    }
}