package com.luisz.luisz576api.api.v1;

import com.luisz.luisz576api.domain.api.IApi;

public final class ApiV1 implements IApi {
    private final String uri;

    public ApiV1(String uri){
        this.uri = uri;
    }
}