package com.luisz.luisz576api.domain.api.builder;

import com.luisz.lapi.LPlugin;
import com.luisz.luisz576api.domain.api.IApi;

public abstract class IApiBuilder<T extends IApi> {
    private final LPlugin plugin;
    protected final LPlugin getPlugin(){
        return this.plugin;
    }
    public IApiBuilder(LPlugin plugin){
        this.plugin = plugin;
    }

    public abstract T build();
}