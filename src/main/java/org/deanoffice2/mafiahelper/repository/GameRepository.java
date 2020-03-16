package org.deanoffice2.mafiahelper.repository;

import org.deanoffice2.mafiahelper.entity.DomainObject;

public interface GameRepository<V extends DomainObject> {
    V findById(Integer idGame);

    void addInfoFromGame(V infoFromGame);
}
