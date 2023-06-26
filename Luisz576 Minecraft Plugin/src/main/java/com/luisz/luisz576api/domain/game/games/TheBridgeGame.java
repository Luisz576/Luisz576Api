package com.luisz.luisz576api.domain.game.games;

import com.luisz.luisz576api.domain.game.GameID;
import com.luisz.luisz576api.domain.game.GameModel;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

public class TheBridgeGame extends GameModel {
    public final String mapName;
    public final TheBridgeGameMode gameMode;
    public final List<UUID> players = new ArrayList<>(), winners = new ArrayList<>();
    //todo vai ser quando acabar a partida? timestamp: Date,
    public TheBridgeGame(String mapName, TheBridgeGameMode gameMode, Collection<UUID> players, Collection<UUID> winners) {
        super(GameID.THE_BRIDGE);
        this.mapName = mapName;
        this.gameMode = gameMode;
        this.players.addAll(players);
        this.winners.addAll(winners);
    }
}