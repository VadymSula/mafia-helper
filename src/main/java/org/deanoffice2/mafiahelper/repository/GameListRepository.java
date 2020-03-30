package org.deanoffice2.mafiahelper.repository;

import org.deanoffice2.mafiahelper.entity.DomainObject;

import java.util.List;

public interface GameListRepository <V extends DomainObject> {
    List<V> findListById(Integer idGame);
}
