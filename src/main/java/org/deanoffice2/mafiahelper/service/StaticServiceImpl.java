package org.deanoffice2.mafiahelper.service;

import org.deanoffice2.mafiahelper.entity.Player;
import org.deanoffice2.mafiahelper.entity.RoleGame;
import org.deanoffice2.mafiahelper.repository.StaticDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("staticService")
public class StaticServiceImpl implements StaticService {

    @Autowired
    @Qualifier("staticDataRepository")
    private StaticDataRepository staticDataRepository;

    @Override
    public List<RoleGame> getRoles() {
        return staticDataRepository.findRolesForSelectList();
    }

    @Override
    public void addNewPlayer(String playerName, String gender) {
        staticDataRepository
                .addNewPlayer(playerName, gender);
    }

    @Override
    public List<Player> getPlayersNicknames() {
        return staticDataRepository
                .getNicknamePlayers();
    }
}
