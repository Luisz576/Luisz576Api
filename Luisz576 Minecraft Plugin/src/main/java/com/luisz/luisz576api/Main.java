package com.luisz.luisz576api;

import com.luisz.lapi.LApi;
import com.luisz.lapi.LPlugin;
import com.luisz.luisz576api.api.connection.builder.ApiConnectionBuilder;
import com.luisz.luisz576api.api.Luisz576Api;
import com.luisz.luisz576api.api.exceptions.ApiAlreadySetupedException;
import com.luisz.luisz576api.api.exceptions.ApiNotLoadedException;

public class Main extends LPlugin {
    @Override
    public void onEnable() {
        try {
            Luisz576Api._setup(this, ApiConnectionBuilder.class);
            LApi.sendConsoleMessage("[Luisz576Api] Plugin loaded!");
        }catch (ApiNotLoadedException e) {
            LApi.sendConsoleMessage("[Luisz576Api] Can't load! Reason:\n" + e.reason);
        } catch (ApiAlreadySetupedException e) {
            LApi.sendConsoleMessage("[Luisz576Api] Error: Aready loaded!");
        }
    }

    @Override
    public void onDisable() {
        LApi.sendConsoleMessage("[Luisz576Api] Plugin unloaded!");
    }
}