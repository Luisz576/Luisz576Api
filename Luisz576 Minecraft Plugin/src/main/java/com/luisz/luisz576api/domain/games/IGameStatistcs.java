package com.luisz.luisz576api.domain.games;

public abstract class IGameStatistcs {
    public final GameID gameID;

    public IGameStatistcs(GameID gameID){
        this.gameID = gameID;
    }

    public abstract IGameStatistcs createUpdateWithValues(IGameStatistcs other);
}