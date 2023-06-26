package com.luisz.luisz576api.domain.playerprofile.enums;

import javax.annotation.Nullable;

public enum Role {
    MEMBER(0, "MEMBRO", "MEMBER", "MIEMBRO"),
    SUB(5, "SUB", "SUB", "SUB"),
    VIP(10, "VIP", "VIP", "VIP"),
    MVP(15, "MVP", "MVP", "MVP"),
    ADMIN(99, "ADM", "ADM", "ADM");

    public final int ID;
    public final String namePT, nameEN, nameES;

    Role(int id, String namePT, String nameEN, String nameES){
        this.ID = id;
        this.namePT = namePT;
        this.nameEN = nameEN;
        this.nameES = nameES;
    }

    public String getName(int languageId){
        return getName(Language.getById(languageId));
    }
    public String getName(@Nullable Language language){
        if(language == null){
            return nameEN;
        }
        switch (language){
            case PT:
                return namePT;
            case EN:
                return nameEN;
            case ES:
                return nameES;
        }
        return nameEN;
    }

    public static Role getById(int id){
        Role[] values = values();
        for(Role role : values){
            if(role.ID == id){
                return role;
            }
        }
        return null;
    }
}