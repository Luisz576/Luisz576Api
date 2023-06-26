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
        Punishment[] values = values();
        for(Punishment punishment : values){
            if(punishment.ID == id){
                return punishment;
            }
        }
        return null;
    }
}