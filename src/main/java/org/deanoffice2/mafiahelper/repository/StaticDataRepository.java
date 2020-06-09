package org.deanoffice2.mafiahelper.repository;

import org.deanoffice2.mafiahelper.entity.Player;
import org.deanoffice2.mafiahelper.entity.RoleGame;

import java.util.List;

public interface StaticDataRepository {
    List<RoleGame> findRolesForSelectList();

    Integer findByName(String name);

    void addNewPlayer(String playerName, String gender);

    List<Player> getNicknamePlayers();
}
