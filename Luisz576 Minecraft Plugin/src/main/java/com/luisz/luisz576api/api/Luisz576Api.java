package com.luisz.luisz576api.api;

import com.luisz.lapi.LPlugin;
import com.luisz.luisz576api.domain.api.IApi;
import com.luisz.luisz576api.domain.api.builder.IApiBuilder;
import com.luisz.luisz576api.api.exceptions.ApiAlreadySetupedException;
import com.luisz.luisz576api.api.exceptions.ApiNotInitializedException;
import com.luisz.luisz576api.api.exceptions.ApiNotLoadedException;
import org.bukkit.plugin.java.JavaPlugin;

import java.lang.reflect.InvocationTargetException;

public class Luisz576Api {
    private static IApi api;
    public static IApi getApi() throws ApiNotInitializedException {
        if(api == null){
            throw new ApiNotInitializedException();
        }
        return api;
    }
    public static boolean isSetuped(){
        return api != null;
    }

    public static <T extends IApiBuilder<?>> void _setup(JavaPlugin plugin, Class<T> connectionBuilder) throws ApiNotLoadedException, ApiAlreadySetupedException {
        if(isSetuped()){
            throw new ApiAlreadySetupedException();
        }
        try{
            IApiBuilder<?> cb = connectionBuilder.getConstructor(LPlugin.class).newInstance(plugin);
            api = cb.build();
        } catch (NoSuchMethodException | IllegalAccessException | InstantiationException | InvocationTargetException e) {
            api = null;
            e.printStackTrace();
            throw new ApiNotLoadedException(e.getMessage());
        }
        if(api == null){
            throw new ApiNotLoadedException("Can't build the ApiConnection");
        }
    }
}