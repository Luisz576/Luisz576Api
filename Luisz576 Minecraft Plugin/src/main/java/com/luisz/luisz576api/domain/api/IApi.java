package com.luisz.luisz576api.domain.api;

import com.luisz.luisz576api.domain.playerprofile.PlayerProfile;

import java.util.UUID;

public interface IApi {
    PlayerProfile getProfile(UUID uuid);
}