package org.deanoffice2.mafiahelper.service;

import org.deanoffice2.mafiahelper.entity.CheckGame;
import org.deanoffice2.mafiahelper.entity.GameResult;
import org.deanoffice2.mafiahelper.entity.PlayerResult;

import java.util.List;

public interface GameService {
    GameResult getGameResults(Integer idGame);

    List<CheckGame> getGameChecks(Integer idGame);

    PlayerResult getPlayerResultByIdAndGameId(Integer idPlayer, Integer idGame);

    void saveGameResults(GameResult gameResult);
}
