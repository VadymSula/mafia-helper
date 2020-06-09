package org.deanoffice2.mafiahelper.repository;

import org.deanoffice2.mafiahelper.entity.DomainObject;

import java.util.List;

public interface GameRepository<V extends DomainObject> {
    V findById(Integer idGame);

    V findById(Integer idGame, Integer idPlayer);

    List<V> getGamesList();

    void addInfoFromGame(V infoFromGame);
}
