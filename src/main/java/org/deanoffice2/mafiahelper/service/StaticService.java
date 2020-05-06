package org.deanoffice2.mafiahelper.service;

import org.deanoffice2.mafiahelper.entity.Player;
import org.deanoffice2.mafiahelper.entity.RoleGame;

import java.util.List;

public interface StaticService {
    List<RoleGame> getRoles();

    void addNewPlayer(String playerName);

    List<Player> getPlayersNicknames();
}
