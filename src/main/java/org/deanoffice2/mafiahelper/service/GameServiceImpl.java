package org.deanoffice2.mafiahelper.service;

import org.deanoffice2.mafiahelper.entity.GameResult;
import org.deanoffice2.mafiahelper.repository.GameResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("gameService")
public class GameServiceImpl implements GameService {

    @Autowired
    @Qualifier("gameResultRepository")
    private GameResultRepository gameResultRepository;

    @Override
    public GameResult findGameById(Integer idGame) {
        return gameResultRepository.findGameById(idGame);
    }

    @Override
    public void saveGameResults(GameResult gameResult) {
        gameResultRepository.addGameResult(gameResult);

        gameResult.getPlayersResult()
                .forEach(gameResultRepository::addPlayerResult);

        gameResult.getChecksResult()
                .forEach((gameResultRepository::addChecksResult));
    }
}
