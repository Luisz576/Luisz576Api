module.exports = {
    getLanguageById(id){
        switch(id){
            case 0:
                return 'en'
            case 1:
                return 'pt'
            case 2:
                return 'es'
        }
        return 'en'
    }
}