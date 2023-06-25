package com.luisz.luisz576api.api.connection.updatedata;

import com.luisz.luisz576api.domain.game.GameID;

import java.util.UUID;

public abstract class IUpdateGameProfileData extends IUpdateGameData {
    public final UUID uuid;

    public IUpdateGameProfileData(UUID uuid, GameID gameID) {
        super(gameID);
        this.uuid = uuid;
    }
}