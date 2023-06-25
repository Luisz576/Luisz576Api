package com.luisz.luisz576api.domain.game.games.thebridge.updatedata;

import com.luisz.luisz576api.domain.game.GameID;
import com.luisz.luisz576api.api.connection.updatedata.IUpdateGameProfileData;

import java.util.UUID;

public class TheBridgeGameProfileUpdateData extends IUpdateGameProfileData {
    public final int kills, deaths, placed_blocks, score;
    public final boolean win;

    public TheBridgeGameProfileUpdateData(UUID uuid, boolean win, int kills, int deaths, int placed_blocks, int score) {
        super(uuid, GameID.THE_BRIDGE);
        this.win = win;
        this.kills = kills;
        this.deaths = deaths;
        this.placed_blocks = placed_blocks;
        this.score = score;
    }

    @Override
    public String buildValidJson() {
        //todo
        return null;
    }
}