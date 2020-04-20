package org.deanoffice2.mafiahelper.repository;

import java.util.Map;

public interface StaticDataRepository {
    Map<Integer, String> findRolesForSelectList();

    Integer findByName(String name);

    void addNewPlayer(String playerName);
}
