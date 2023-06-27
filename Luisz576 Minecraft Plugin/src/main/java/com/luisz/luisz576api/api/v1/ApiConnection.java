package com.luisz.luisz576api.api.v1;

import com.luisz.luisz576api.api.connection.IApiConnection;

public class ApiConnection implements IApiConnection {
    private final String url, token;

    public ApiConnection(String url, String token){
        if(!url.endsWith("/")){
            url += "/";
        }
        this.url = url;
        this.token = token;
    }
}