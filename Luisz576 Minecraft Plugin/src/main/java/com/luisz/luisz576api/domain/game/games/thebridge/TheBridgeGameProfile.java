package com.luisz.luisz576api.domain.game.games.thebridge;

import com.luisz.luisz576api.domain.game.GameID;
import com.luisz.luisz576api.domain.game.IGameProfile;

import java.util.UUID;

public class TheBridgeGameProfile extends IGameProfile {
    public final int winstreak, max_winstreak, wins, kills, deaths, placed_blocks, total_score;

    public TheBridgeGameProfile(UUID uuid, int winstreak, int max_winstreak, int wins, int kills, int deaths, int placed_blocks, int total_score) {
        super(uuid, GameID.THE_BRIDGE);
        this.winstreak = winstreak;
        this.max_winstreak = max_winstreak;
        this.wins = wins;
        this.kills = kills;
        this.deaths = deaths;
        this.placed_blocks = placed_blocks;
        this.total_score = total_score;
    }
}