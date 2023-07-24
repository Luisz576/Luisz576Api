package com.luisz.luisz576api.domain.playerprofile.language;

import com.luisz.lapi.common.language.Language;

public class LanguageGetter {
    public static Language getById(int id){
        switch (id){
            case 0:
                return Language.EN;
            case 1:
                return Language.PT;
            case 2:
                return Language.ES;
        }
        return null;
    }
}