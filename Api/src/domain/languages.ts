export type Language = 'en' | 'pt' | 'es'

export function validateLanguage(language: number): boolean {
    return language == 0 || language == 1 || language == 2
}

export function getLanguageById(id: number, defaultReturn: Language = 'en'): Language{
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