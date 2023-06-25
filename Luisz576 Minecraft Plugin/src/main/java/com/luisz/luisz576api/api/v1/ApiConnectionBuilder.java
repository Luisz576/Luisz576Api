package com.luisz.luisz576api.api.v1;

import com.luisz.lapi.LPlugin;
import com.luisz.lapi.config.LConfig;
import com.luisz.luisz576api.api.connection.builder.IApiConnectionBuilder;

public class ApiConnectionBuilder extends IApiConnectionBuilder<ApiConnection> {
    private final String URL_API_KEY = "url_api", TOKEN_API_KEY = "token_api";

    private final LConfig config;

    public ApiConnectionBuilder(LPlugin plugin) {
        super(plugin);
        config = new LConfig("api_connection_configs", plugin);
        _saveDefaultConfigs();
    }

    private void _saveDefaultConfigs(){
        if(!config.hasKey(URL_API_KEY)){
            config.setValue(URL_API_KEY, "");
        }
        if(!config.hasKey(TOKEN_API_KEY)){
            config.setValue(TOKEN_API_KEY, "");
        }
        config.save();
    }

    @Override
    public ApiConnection build() {
        String url = config.getString(URL_API_KEY);
        String token = config.getString(TOKEN_API_KEY);
        if(url == null || url.isEmpty() || token == null || token.isEmpty()){
            return null;
        }
        return new ApiConnection(url, token);
    }
}