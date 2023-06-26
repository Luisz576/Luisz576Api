package com.luisz.luisz576api.domain.playerprofile.enums;

import javax.annotation.Nullable;

public enum Role {
    MEMBRO(0, "MEMBRO", "MEMBER"),
    SUB(5, "SUB", "SUB"),
    VIP(10, "VIP", "VIP"),
    MVP(15, "MVP", "MVP"),
    ADMIN(99, "ADM", "ADM");

    public final int ID;
    public final String namePT, nameEN;

    Role(int id, String namePT, String nameEN){
        this.ID = id;
        this.namePT = namePT;
        this.nameEN = nameEN;
    }

    public String getName(int languageId){
        return getName(Language.getById(languageId));
    }
    public String getName(@Nullable Language language){
        if(language == null){
            language = Language.PT;
        }
        switch (language){
            case PT:
                return namePT;
            case EN:
                return nameEN;
        }
        return namePT;
    }

    public static Role getById(int id){
        switch (id){
            case 0:
                return MEMBRO;
            case 5:
                return SUB;
            case 10:
                return VIP;
            case 15:
                return MVP;
            case 20:
                return ADMIN;
        }
        return null;
    }
}