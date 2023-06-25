package com.luisz.luisz576api.api.connection;

import com.luisz.luisz576api.domain.games.GameID;
import com.luisz.luisz576api.domain.games.IGameStatistcs;
import com.luisz.luisz576api.domain.playerprofile.PlayerProfile;

import java.util.UUID;

public interface IApiConnection {
    boolean updateGameWithNewStatistics(IGameStatistcs gameStatistcs);
    IGameStatistcs loadGameStatistics(GameID gameID);
    PlayerProfile loadPlayerProfileOrCreateNew(UUID uuid);
    boolean giveXPToPlayerProfile(int amount);
    boolean updatePlayerProfileSkin(String skin);
    IGameStatistcs loadPlayerGameStatistics(GameID gameID, UUID uuid);
}