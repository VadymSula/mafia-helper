package org.deanoffice2.mafiahelper.service;

import java.util.Map;

public interface StaticService {
    Map<Integer, String> getRoles();

    void addNewPlayer(String playerName);

    Map<Integer, String> getPlayersNicknames();
}
