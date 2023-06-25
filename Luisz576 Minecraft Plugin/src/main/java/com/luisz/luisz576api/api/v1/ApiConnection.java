package com.luisz.luisz576api.api.v1;

import com.google.gson.JsonElement;
import com.luisz.lapi.lib.url.HttpRequester;
import com.luisz.luisz576api.api.connection.IApiConnection;
import com.luisz.luisz576api.api.connection.updatedata.IUpdateGameProfileData;
import com.luisz.luisz576api.domain.game.GameID;
import com.luisz.luisz576api.api.connection.updatedata.IUpdateGameData;
import com.luisz.luisz576api.domain.game.IGameStatistcs;
import com.luisz.luisz576api.domain.playerprofile.PlayerProfile;

import java.net.MalformedURLException;
import java.util.UUID;

public class ApiConnection implements IApiConnection {
    private final String url, token;

    public ApiConnection(String url, String token){
        if(!url.endsWith("/")){
            url += "/";
        }
        this.url = url;
        this.token = token;
    }

    @Override
    public boolean updateGameWithNewStatistics(IUpdateGameData gameStatistcs) {
        try{
            //todo atualiza estatisticas
            JsonElement json = HttpRequester.GetJson(url + "/");
            // todo verificar json
            return true;
        }catch (MalformedURLException e){
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public boolean updateGamePlayerStatistics(IUpdateGameProfileData updateData) {
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