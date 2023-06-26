package com.luisz.luisz576api.api.connection;

import com.luisz.luisz576api.domain.game.GameModel;
import com.luisz.luisz576api.domain.playerprofile.PlayerProfile;
import com.luisz.luisz576api.domain.product.ProductId;

import java.util.UUID;

public interface IApiConnection {
    boolean uploadGameData(GameModel game);
    PlayerProfile loadPlayerProfileOrCreateNew(UUID uuid);
    boolean updatePlayerProfileSkin(String skin);
    boolean _playerInitSession(UUID uuid);
    boolean buyUsingCash(ProductId product, UUID uuid);
}