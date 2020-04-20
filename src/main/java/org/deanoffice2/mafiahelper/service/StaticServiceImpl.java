package org.deanoffice2.mafiahelper.service;

import org.deanoffice2.mafiahelper.repository.StaticDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service("staticService")
public class StaticServiceImpl implements StaticService {

    @Autowired
    @Qualifier("staticDataRepository")
    private StaticDataRepository staticDataRepository;

    @Override
    public Map<Integer, String> getRoles() {
        return staticDataRepository.findRolesForSelectList();
    }

    @Override
    public void addNewPlayer(String playerName) {
        staticDataRepository
                .addNewPlayer(playerName);
    }
}
