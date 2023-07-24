package com.luisz.luisz576api.api.v1;

import com.luisz.lapi.lib.url.http.HttpRequester;
import com.luisz.luisz576api.domain.api.IApi;
import com.luisz.luisz576api.domain.playerprofile.PlayerProfile;
import com.luisz.luisz576api.domain.playerprofile.language.LanguageGetter;
import com.luisz.luisz576api.domain.playerprofile.enums.Role;

import java.util.UUID;

public final class ApiV1 implements IApi {
    private final String uri;
    private final HttpRequester httpRequester = new HttpRequester();

    @Override
    public PlayerProfile getProfile(UUID uuid) {
        return new PlayerProfile(//TODO
            uuid,
            "teste",
            "",
            "",
            "",
            "Luisz576",
            "Luisz576",
            LanguageGetter.getById(0),
            Role.VIP,
            576,
            576,
            576,
            true,
            false
        );
    }

    public ApiV1(String uri){
        this.uri = uri;
    }
}