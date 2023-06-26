package com.luisz.luisz576api.domain.game;

public abstract class GameModel {
    public final GameID gameID;

    public GameModel(GameID gameID){
        this.gameID = gameID;
    }
}