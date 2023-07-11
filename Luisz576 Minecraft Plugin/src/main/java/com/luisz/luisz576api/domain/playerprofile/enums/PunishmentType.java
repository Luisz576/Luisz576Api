package com.luisz.luisz576api.domain.playerprofile.enums;

public enum PunishmentType {
    MUTE(1),
    TEMPORARY_BAN(2),
    BAN(3);

    public final int ID;
    PunishmentType(int id){
        this.ID = id;
    }

    public static PunishmentType getById(int id){
        PunishmentType[] values = values();
        for(PunishmentType punishment : values){
            if(punishment.ID == id){
                return punishment;
            }
        }
        return null;
    }
}