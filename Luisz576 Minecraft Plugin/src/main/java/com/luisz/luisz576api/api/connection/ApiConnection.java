package com.luisz.luisz576api.api.connection;

import com.luisz.luisz576api.domain.games.GameID;
import com.luisz.luisz576api.domain.games.IGameStatistcs;
import com.luisz.luisz576api.domain.playerprofile.PlayerProfile;

import java.util.UUID;

public class ApiConnection implements IApiConnection {
    private final String url, token;

    public ApiConnection(String url, String token){
        this.url = url;
        this.token = token;
    }

    @Override
    public boolean updateGameWithNewStatistics(IGameStatistcs gameStatistcs) {
        return false;
    }

    @Override
    public IGameStatistcs loadGameStatistics(GameID gameID) {
        return null;
    }

    @Override
    public PlayerProfile loadPlayerProfileOrCreateNew(UUID uuid) {
        return null;
    }

    @Override
    public boolean giveXPToPlayerProfile(int amount) {
        return false;
    }

    @Override
    public boolean updatePlayerProfileSkin(String skin) {
        return false;
    }

    @Override
    public IGameStatistcs loadPlayerGameStatistics(GameID gameID, UUID uuid) {
        return null;
    }
}