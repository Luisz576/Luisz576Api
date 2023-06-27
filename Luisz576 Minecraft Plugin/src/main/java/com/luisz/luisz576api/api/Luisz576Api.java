package com.luisz.luisz576api.api;

import com.luisz.lapi.LPlugin;
import com.luisz.luisz576api.api.connection.IApiConnection;
import com.luisz.luisz576api.api.connection.builder.IApiConnectionBuilder;
import com.luisz.luisz576api.api.exceptions.ApiAlreadySetupedException;
import com.luisz.luisz576api.api.exceptions.ApiNotLoadedException;

import java.lang.reflect.InvocationTargetException;

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