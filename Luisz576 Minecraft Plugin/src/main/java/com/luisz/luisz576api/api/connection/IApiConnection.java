package com.luisz.luisz576api.api.connection;

import com.luisz.luisz576api.domain.game.GameID;
import com.luisz.luisz576api.domain.game.IGameStatistics;
import com.luisz.luisz576api.api.connection.updatedata.IUpdateGameData;
import com.luisz.luisz576api.api.connection.updatedata.IUpdateGameProfileData;
import com.luisz.luisz576api.domain.playerprofile.PlayerProfile;

import java.util.UUID;

public interface IApiConnection {
    boolean updateGameWithNewStatistics(IUpdateGameData gameStatistcs);
    boolean updateGamePlayerStatistics(IUpdateGameProfileData updateData);
    IGameStatistics loadGameStatistics(GameID gameID);
    PlayerProfile loadPlayerProfileOrCreateNew(UUID uuid);
    boolean updatePlayerProfileSkin(String skin);
    IGameStatistics loadPlayerGameStatistics(GameID gameID, UUID uuid);
}