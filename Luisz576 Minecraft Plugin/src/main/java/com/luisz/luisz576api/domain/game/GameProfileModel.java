package com.luisz.luisz576api.domain.game;

import java.util.UUID;

public abstract class GameProfileModel {
    public UUID uuid;
    public GameID gameID;

    public GameProfileModel(UUID uuid, GameID gameID){
        this.uuid = uuid;
        this.gameID = gameID;
    }
}