package com.luisz.luisz576api.domain.game.model;

import com.luisz.luisz576api.domain.game.GameID;

public abstract class GameModel {
    public final GameID gameID;

    public GameModel(GameID gameID){
        this.gameID = gameID;
    }

    public abstract String toApiJson();
}