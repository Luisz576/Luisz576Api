package com.luisz.luisz576api.api.v1;

import com.luisz.lapi.LPlugin;
import com.luisz.lapi.config.LConfig;
import com.luisz.luisz576api.domain.api.builder.IApiBuilder;

public final class ApiV1Builder extends IApiBuilder<ApiV1> {
    private final String URL_API_KEY = "url_api";

    private final LConfig config;

    public ApiV1Builder(LPlugin plugin) {
        super(plugin);
        config = new LConfig("api_connection_configs", plugin);
        _saveDefaultConfigs();
    }

    private void _saveDefaultConfigs(){
        if(!config.hasKey(URL_API_KEY)){
            config.setValue(URL_API_KEY, "");
        }
        config.save();
    }

    @Override
    public ApiV1 build() {
        String url = config.getString(URL_API_KEY);
        if(url == null || url.isEmpty()){
            return null;
        }
        return new ApiV1(url);
    }
}