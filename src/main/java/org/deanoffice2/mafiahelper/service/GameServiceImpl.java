package org.deanoffice2.mafiahelper.service;

import org.deanoffice2.mafiahelper.entity.CheckGame;
import org.deanoffice2.mafiahelper.entity.GameResult;
import org.deanoffice2.mafiahelper.entity.PlayerResult;
import org.deanoffice2.mafiahelper.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("gameService")
public class GameServiceImpl implements GameService {

    @Autowired
    @Qualifier("gameResultRepository")
    private GameRepository<GameResult> gameRepository;
    @Autowired
    @Qualifier("playerResultRepository")
    private GameRepository<PlayerResult> playerRepository;
    @Autowired
    @Qualifier("checksResultRepository")
    private GameRepository<CheckGame> checkRepository;

    @Override
    public void saveGameResults(GameResult gameResult) {
        gameRepository.addInfoFromGame(gameResult);

        gameResult.getPlayersResult()
                .forEach(playerRepository::addInfoFromGame);

        gameResult.getChecksResult()
                .forEach(checkRepository::addInfoFromGame);
    }
}
