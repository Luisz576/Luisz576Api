package com.luisz.luisz576api.domain.playerprofile.enums;

public enum Punishment {
    MUTE(1),
    TEMPORARY_BAN(2),
    BAN(3);

    public final int ID;
    Punishment(int id){
        this.ID = id;
    }

    public static Punishment getById(int id){
        switch (id){
            case 1:
                return MUTE;
            case 2:
                return TEMPORARY_BAN;
            case 3:
                return BAN;
        }
        return null;
    }
}