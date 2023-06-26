package com.luisz.luisz576api.api;

import com.luisz.lapi.LPlugin;
import com.luisz.lapi.player.skin.Skin;
import com.luisz.luisz576api.api.connection.IApiConnection;
import com.luisz.luisz576api.api.connection.builder.IApiConnectionBuilder;
import com.luisz.luisz576api.api.exceptions.ApiAlreadySetupedException;
import com.luisz.luisz576api.api.exceptions.ApiNotLoadedException;
import com.luisz.luisz576api.domain.game.GameModel;
import com.luisz.luisz576api.domain.playerprofile.PlayerProfile;
import com.luisz.luisz576api.domain.product.ProductId;

import java.lang.reflect.InvocationTargetException;
import java.util.UUID;

public class Luisz576Api implements IApi {
    private static Luisz576Api instance = null;
    public static Luisz576Api getInstance(){
        return instance;
    }
    public static boolean isSetuped(){
        return instance != null;
    }

    private final IApiConnection apiConnection;

    private Luisz576Api(IApiConnection apiConnection){
        this.apiConnection = apiConnection;
    }

    @Override
    public PlayerProfile loadPlayerProfileOrCreateNew(UUID uuid) {
        return apiConnection.loadPlayerProfileOrCreateNew(uuid);
    }

    @Override
    public Skin loadPlayerProfileSkin(UUID uuid){
        PlayerProfile profile = apiConnection.loadPlayerProfileOrCreateNew(uuid);
        if(profile.skin.isEmpty()){
            return null;
        }
        return Skin.fromName(profile.skin);
    }

    @Override
    public boolean _playerInitSession(UUID uuid) {
        return apiConnection._playerInitSession(uuid);
    }

    @Override
    public boolean uploadGameData(GameModel game) {
        return apiConnection.uploadGameData(game);
    }

    @Override
    public boolean buyUsingCash(ProductId product, UUID uuid) {
        return apiConnection.buyUsingCash(product, uuid);
    }

    @Override
    public boolean updatePlayerProfileSkin(String skin) {
        return apiConnection.updatePlayerProfileSkin(skin);
    }

    public static <T extends IApiConnectionBuilder<?>> void _setup(LPlugin plugin, Class<T> connectionBuilder) throws ApiNotLoadedException, ApiAlreadySetupedException {
        if(isSetuped()){
            throw new ApiAlreadySetupedException();
        }
        try{
            IApiConnectionBuilder<?> cb = connectionBuilder.getConstructor(LPlugin.class).newInstance(plugin);
            instance = new Luisz576Api(cb.build());
        } catch (NoSuchMethodException | IllegalAccessException | InstantiationException | InvocationTargetException e) {
            instance = null;
            e.printStackTrace();
            throw new ApiNotLoadedException(e.getMessage());
        }
        if(instance.apiConnection == null){
            instance = null;
            throw new ApiNotLoadedException("Can't build the ApiConnection");
        }
    }
}