package org.deanoffice2.mafiahelper.repository;

import org.deanoffice2.mafiahelper.entity.DomainObject;
import org.deanoffice2.mafiahelper.entity.GameResult;

public interface GameResultRepository<V extends DomainObject> {
    GameResult findGameById(Integer idGame);
}
