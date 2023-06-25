package com.luisz.luisz576api.domain.game;

public enum GameID {
    BLOCK_PARTY(5),
    THE_BRIDGE(10);

    private final int id;
    public int id(){
        return this.id;
    }

    GameID(int id){
        this.id = id;
    }
}