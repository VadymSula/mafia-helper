package org.deanoffice2.mafiahelper.repository;

import org.deanoffice2.mafiahelper.entity.CheckGame;
import org.deanoffice2.mafiahelper.entity.DomainObject;
import org.deanoffice2.mafiahelper.entity.GameResult;
import org.deanoffice2.mafiahelper.entity.PlayerResult;

public interface GameResultRepository<V extends DomainObject> {
    GameResult findGameById(Integer idGame);

    void addGameResult(GameResult gameResult);

    void addPlayerResult(PlayerResult playerResult);

    void addChecksResult(CheckGame checkGame);
}
