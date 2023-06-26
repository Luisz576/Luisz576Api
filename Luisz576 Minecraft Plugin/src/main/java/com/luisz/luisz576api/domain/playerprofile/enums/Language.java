package com.luisz.luisz576api.domain.playerprofile.enums;

public enum Language {
    PT(0),
    EN(1);

    public final int ID;
    Language(int id){
        this.ID = id;
    }

    public static Language getById(int id){
        switch (id){
            case 0:
                return PT;
            case 1:
                return EN;
        }
        return null;
    }
}