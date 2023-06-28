package com.luisz.luisz576api.domain.game.model;

import com.luisz.luisz576api.domain.game.GameID;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public abstract class GameModel {
    public final GameID gameID;

    public abstract String toApiJson();
}