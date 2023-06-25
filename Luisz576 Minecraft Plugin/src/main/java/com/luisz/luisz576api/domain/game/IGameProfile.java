package com.luisz.luisz576api.domain.game;

import java.util.UUID;

public abstract class IGameProfile {
    public UUID uuid;
    public GameID gameID;

    public IGameProfile(UUID uuid, GameID gameID){
        this.uuid = uuid;
        this.gameID = gameID;
    }
}