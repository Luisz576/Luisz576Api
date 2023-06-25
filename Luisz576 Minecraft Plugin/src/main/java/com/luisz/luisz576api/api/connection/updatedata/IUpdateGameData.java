package com.luisz.luisz576api.api.connection.updatedata;

import com.luisz.luisz576api.domain.game.GameID;

public abstract class IUpdateGameData {
    public final GameID gameID;

    public IUpdateGameData(GameID gameID){
        this.gameID = gameID;
    }

    public abstract String buildValidJson();
}