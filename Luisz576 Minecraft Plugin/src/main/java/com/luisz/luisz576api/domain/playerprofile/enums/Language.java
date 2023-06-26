package com.luisz.luisz576api.domain.playerprofile.enums;

public enum Language {
    EN(0, "en"),
    PT(1, "pt"),
    ES(2, "es");

    public final int ID;
    public final String acronym;
    Language(int id, String acronym){
        this.ID = id;
        this.acronym = acronym;
    }

    public static Language getById(int id){
        Language[] values = values();
        for(Language language : values){
            if(language.ID == id){
                return language;
            }
        }
        return null;
    }
}