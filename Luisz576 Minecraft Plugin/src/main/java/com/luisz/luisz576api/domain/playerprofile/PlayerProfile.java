package com.luisz.luisz576api.domain.playerprofile;

import java.util.UUID;

public class PlayerProfile {
    public final UUID uuid;
    public final String skin;
    public final int networkLevel, networkXp;

    public PlayerProfile(UUID uuid, String skin, int networkLevel, int networkXp){
        this.uuid = uuid;
        this.skin = skin;
        this.networkLevel = networkLevel;
        this.networkXp = networkXp;
    }
}