package com.luisz.luisz576api.domain.games.thebridge;

import com.luisz.luisz576api.domain.games.GameID;
import com.luisz.luisz576api.domain.games.IGameStatistcs;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class TheBridgeStatistics extends IGameStatistcs {
    private final Map<Integer, UUID> topWinners = new HashMap<>();

    public TheBridgeStatistics() {
        super(GameID.THE_BRIDGE);
    }

    @Override
    public IGameStatistcs createUpdateWithValues(IGameStatistcs other) {
        if(other == this){
            return this;
        }
        //TODO
        return null;
    }
}