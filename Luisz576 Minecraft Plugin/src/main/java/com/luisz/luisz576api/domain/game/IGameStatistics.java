package com.luisz.luisz576api.domain.game;

public abstract class IGameStatistics {
    public final GameID gameID;

    public IGameStatistics(GameID gameID){
        this.gameID = gameID;
    }
}