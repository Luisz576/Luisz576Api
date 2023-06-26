package com.luisz.luisz576api.api.v1;

import com.luisz.luisz576api.api.connection.IApiConnection;
import com.luisz.luisz576api.domain.game.GameModel;
import com.luisz.luisz576api.domain.playerprofile.PlayerProfile;
import com.luisz.luisz576api.domain.product.ProductId;

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
    public boolean _playerInitSession(UUID uuid) {
        return false;
    }

    @Override
    public boolean uploadGameData(GameModel game) {
        return false;
    }

    @Override
    public boolean buyUsingCash(ProductId product, UUID uuid) {
        return false;
    }

    @Override
    public PlayerProfile loadPlayerProfileOrCreateNew(UUID uuid) {
        return null;
    }

    @Override
    public boolean updatePlayerProfileSkin(String skin) {
        return false;
    }
}