package com.luisz.luisz576api;

import com.luisz.lapi.LApi;
import com.luisz.luisz576api.api.Luisz576Api;
import com.luisz.luisz576api.api.v1.ApiV1Builder;
import com.luisz.luisz576api.api.exceptions.ApiAlreadySetupedException;
import com.luisz.luisz576api.api.exceptions.ApiNotLoadedException;
import org.bukkit.plugin.java.JavaPlugin;

public class Main extends JavaPlugin {
    @Override
    public void onEnable() {
        try {
            Luisz576Api._setup(this, ApiV1Builder.class);
            LApi.sendConsoleMessage("[Luisz576Api] Plugin loaded!");
        }catch (ApiNotLoadedException e) {
            LApi.sendConsoleMessage("[Luisz576Api] Can't load! Reason:\n" + e.reason);
        } catch (ApiAlreadySetupedException e) {
            LApi.sendConsoleMessage("[Luisz576Api] Error: Still loaded!");
        }
    }

    @Override
    public void onDisable() {
        LApi.sendConsoleMessage("[Luisz576Api] Plugin unloaded!");
    }
}