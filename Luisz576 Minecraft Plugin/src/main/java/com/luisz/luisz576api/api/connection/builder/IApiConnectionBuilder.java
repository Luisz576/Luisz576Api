package com.luisz.luisz576api.api.connection.builder;

import com.luisz.lapi.LPlugin;
import com.luisz.luisz576api.api.connection.IApiConnection;

public abstract class IApiConnectionBuilder<T extends IApiConnection> {
    private final LPlugin plugin;
    protected final LPlugin getPlugin(){
        return this.plugin;
    }
    public IApiConnectionBuilder(LPlugin plugin){
        this.plugin = plugin;
    }

    public abstract T build();
}