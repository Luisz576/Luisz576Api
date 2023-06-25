package com.luisz.luisz576api.api;

import com.luisz.lapi.LPlugin;
import com.luisz.lapi.player.skin.Skin;
import com.luisz.luisz576api.api.connection.IApiConnection;
import com.luisz.luisz576api.api.connection.builder.IApiConnectionBuilder;
import com.luisz.luisz576api.api.connection.updatedata.IUpdateGameProfileData;
import com.luisz.luisz576api.domain.game.GameID;
import com.luisz.luisz576api.api.connection.updatedata.IUpdateGameData;
import com.luisz.luisz576api.domain.game.IGameStatistcs;
import com.luisz.luisz576api.api.exceptions.ApiAlreadySetupedException;
import com.luisz.luisz576api.api.exceptions.ApiNotLoadedException;
import com.luisz.luisz576api.domain.playerprofile.PlayerProfile;

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
    public IGameStatistcs loadGameStatistics(GameID gameID) {
        return apiConnection.loadGameStatistics(gameID);
    }

    @Override
    public PlayerProfile loadPlayerProfileOrCreateNew(UUID uuid) {
        return apiConnection.loadPlayerProfileOrCreateNew(uuid);
    }

    @Override
    public boolean giveXPToPlayerProfile(int amount) {
        return apiConnection.giveXPToPlayerProfile(amount);
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
    public boolean updateGameWithNewStatistics(IUpdateGameData gameStatistcs) {
        return apiConnection.updateGameWithNewStatistics(gameStatistcs);
    }

    @Override
    public boolean updateGamePlayerStatistics(IUpdateGameProfileData updateData) {
        return apiConnection.updateGamePlayerStatistics(updateData);
    }

    @Override
    public boolean updatePlayerProfileSkin(String skin) {
        return apiConnection.updatePlayerProfileSkin(skin);
    }

    @Override
    public IGameStatistcs loadPlayerGameStatistics(GameID gameID, UUID uuid) {
        return apiConnection.loadPlayerGameStatistics(gameID, uuid);
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