package org.deanoffice2.mafiahelper.service;

import org.deanoffice2.mafiahelper.entity.GameResult;

public interface GameService {
    GameResult findGameById(Integer idGame);

    void saveGameResults(GameResult gameResult);
}
