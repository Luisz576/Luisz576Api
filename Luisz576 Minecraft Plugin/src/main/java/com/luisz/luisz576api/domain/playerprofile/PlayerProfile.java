package com.luisz.luisz576api.domain.playerprofile;

import com.luisz.luisz576api.domain.playerprofile.enums.Role;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@RequiredArgsConstructor
public class PlayerProfile {
    public final UUID uuid;
    public final String username, skin;
    public final int networkXp, cash, coins;
    public final boolean Punishment;
    public final Role role;
    //TODO: created, last_login
}