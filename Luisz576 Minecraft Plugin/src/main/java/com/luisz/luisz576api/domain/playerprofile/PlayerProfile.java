package com.luisz.luisz576api.domain.playerprofile;

import com.luisz.lapi.player.skin.Skin;
import com.luisz.luisz576api.api.Luisz576Api;

import java.util.UUID;

public class PlayerProfile {
    public final UUID uuid;
    public String skin;
    public int networkLevel, networkXp;

    public PlayerProfile(UUID uuid, String skin, int networkLevel, int networkXp){
        this.uuid = uuid;
        this.skin = skin;
        this.networkLevel = networkLevel;
        this.networkXp = networkXp;
    }

    public final boolean updateSkin(String skin){
        if(Skin.isValidSkinName(skin)){
            return Luisz576Api.getInstance().updatePlayerProfileSkin(skin);
        }
        return false;
    }
}