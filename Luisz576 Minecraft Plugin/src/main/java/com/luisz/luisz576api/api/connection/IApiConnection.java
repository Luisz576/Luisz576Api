package com.luisz.luisz576api.api.connection;

import com.luisz.luisz576api.domain.game.GameID;
import com.luisz.luisz576api.domain.game.IGameStatistcs;
import com.luisz.luisz576api.api.connection.updatedata.IUpdateGameData;
import com.luisz.luisz576api.api.connection.updatedata.IUpdateGameProfileData;
import com.luisz.luisz576api.domain.playerprofile.PlayerProfile;

import java.util.UUID;

public interface IApiConnection {
    boolean updateGameWithNewStatistics(IUpdateGameData gameStatistcs);
    boolean updateGamePlayerStatistics(IUpdateGameProfileData updateData);
    IGameStatistcs loadGameStatistics(GameID gameID);
    PlayerProfile loadPlayerProfileOrCreateNew(UUID uuid);
    boolean giveXPToPlayerProfile(int amount);
    boolean updatePlayerProfileSkin(String skin);
    IGameStatistcs loadPlayerGameStatistics(GameID gameID, UUID uuid);
}