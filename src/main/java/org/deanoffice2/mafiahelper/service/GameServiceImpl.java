package org.deanoffice2.mafiahelper.service;

import org.deanoffice2.mafiahelper.entity.CheckGame;
import org.deanoffice2.mafiahelper.entity.GameResult;
import org.deanoffice2.mafiahelper.entity.PlayerResult;
import org.deanoffice2.mafiahelper.exceptions.IllegalInputDataException;
import org.deanoffice2.mafiahelper.repository.GameListRepository;
import org.deanoffice2.mafiahelper.repository.GameRepository;
import org.deanoffice2.mafiahelper.repository.StaticDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    @Autowired
    @Qualifier("checksResultRepository")
    private GameListRepository<CheckGame> checkListRepository;
    @Autowired
    @Qualifier("staticDataRepository")
    private StaticDataRepository staticDataRepository;

    @Override
    public GameResult getGameResults(Integer idGame) {
        return gameRepository.findById(idGame);
    }

    @Override
    public void saveGameResults(GameResult gameResult) {
        Optional.ofNullable(gameResult.getGameDuration()).orElseThrow(
                () -> new IllegalInputDataException(gameResult.getGameDuration(), "gameDuration"));
        Optional.ofNullable(gameResult.getWin()).orElseThrow(
                () -> new IllegalInputDataException(gameResult.getWin(), "win"));

        gameRepository.addInfoFromGame(gameResult);

        gameResult.getPlayersResult()
                .forEach(playerRepository::addInfoFromGame);

        gameResult.getChecksResult()
                .forEach(checkRepository::addInfoFromGame);
    }

    @Override
    public List<CheckGame> getGameChecks(Integer idGame) {
        return checkListRepository.findListById(idGame);
    }

    @Override
    public PlayerResult getPlayerResultByIdAndGameId(Integer idGame, Integer idPlayer) {
        PlayerResult playerResult = playerRepository.findById(idGame, idPlayer);

        if (isRole(playerResult, staticDataRepository.findByName("Sheriff"))) {
            playerResult.setChecks(getInfoIfPlayerIsSheriff(idGame));
        } else if (isRole(playerResult, staticDataRepository.findByName("Don"))) {
            playerResult.setChecks(getInfoIfPlayerIsDon(idGame));
        }

        return playerResult;
    }

    private boolean isRole(PlayerResult playerResult, Integer role) {
        return playerResult.getRoleInGame().getIdRole().equals(role);
    }

    private List<Integer> getInfoIfPlayerIsSheriff(Integer idGame) {
        List<Integer> sheriffChecks = new ArrayList<>();

        checkListRepository.findListById(idGame)
                .forEach(checkGame -> {
                    sheriffChecks.add(checkGame.getSheriffCheck());
                });

        return sheriffChecks;
    }

    private List<Integer> getInfoIfPlayerIsDon(Integer idGame) {
        List<Integer> donChecks = new ArrayList<>();

        checkListRepository.findListById(idGame)
                .forEach(checkGame -> {
                    donChecks.add(checkGame.getDonCheck());
                });

        return donChecks;
    }


}
