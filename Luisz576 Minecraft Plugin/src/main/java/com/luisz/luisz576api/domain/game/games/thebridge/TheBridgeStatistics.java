package com.luisz.luisz576api.domain.game.games.thebridge;

import com.luisz.luisz576api.domain.game.GameID;
import com.luisz.luisz576api.domain.game.IGameStatistcs;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class TheBridgeStatistics extends IGameStatistcs {
    private final Map<Integer, UUID> topWinners = new HashMap<>();

    public TheBridgeStatistics() {
        super(GameID.THE_BRIDGE);
    }
}