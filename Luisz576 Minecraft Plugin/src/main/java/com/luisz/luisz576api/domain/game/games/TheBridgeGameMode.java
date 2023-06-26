package com.luisz.luisz576api.domain.game.games;

public enum TheBridgeGameMode {
    NORMAL(1),
    RUSH(2);

    public final int ID;
    TheBridgeGameMode(int id){
        this.ID = id;
    }

    public static TheBridgeGameMode getById(int id){
        switch (id){
            case 1:
                return NORMAL;
            case 2:
                return RUSH;
        }
        return null;
    }
}