package com.luisz.luisz576api.domain.game.model;

import com.luisz.luisz576api.domain.game.GameID;

import java.util.UUID;

public abstract class GameProfileModel extends GameModel {
    public UUID uuid;

    public GameProfileModel(UUID uuid, GameID gameID){
        super(gameID);
        this.uuid = uuid;
    }
}