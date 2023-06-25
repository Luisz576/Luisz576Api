package com.luisz.luisz576api.domain.game;

public abstract class IGameStatistcs {
    public final GameID gameID;

    public IGameStatistcs(GameID gameID){
        this.gameID = gameID;
    }
}