package com.luisz.luisz576api.api;

import com.luisz.lapi.player.skin.Skin;
import com.luisz.luisz576api.api.connection.IApiConnection;

import java.util.UUID;

public interface IApi extends IApiConnection {
    Skin loadPlayerProfileSkin(UUID uuid);
}