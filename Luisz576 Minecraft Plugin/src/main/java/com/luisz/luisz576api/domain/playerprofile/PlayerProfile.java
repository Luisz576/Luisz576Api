package com.luisz.luisz576api.domain.playerprofile;

import com.luisz.lapi.common.language.Language;
import com.luisz.luisz576api.domain.playerprofile.enums.Role;
import lombok.AllArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
public class PlayerProfile {
    public UUID uuid;
    public String username, skin, email, discord, youtube, twitch;
    public Language language;
    public Role role;
    public int network_xp, cash, coins;
    public boolean account_actived, punishment;
}