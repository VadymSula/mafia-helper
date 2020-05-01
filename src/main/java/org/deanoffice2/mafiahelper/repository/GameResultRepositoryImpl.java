package org.deanoffice2.mafiahelper.repository;

import org.deanoffice2.mafiahelper.entity.CheckGame;
import org.deanoffice2.mafiahelper.entity.GameResult;
import org.deanoffice2.mafiahelper.entity.PlayerResult;
import org.deanoffice2.mafiahelper.exceptions.DataNotFoundException;
import org.deanoffice2.mafiahelper.exceptions.IllegalInputDataException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@org.springframework.stereotype.Repository("gameResultRepository")
public class GameResultRepositoryImpl implements GameRepository<GameResult> {
    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    public GameResultRepositoryImpl(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public GameResult findById(Integer idGame) {
        try {
            return jdbcTemplate.queryForObject(
                    "SELECT win, game_duration " +
                            "FROM game " +
                            "WHERE id_game = :idGame",
                    new MapSqlParameterSource("idGame", idGame),
                    (rs, rowName) -> {
                        GameResult gameResult = new GameResult();
                        gameResult.setGameDuration(rs.getString("game_duration"));
                        gameResult.setWin(rs.getString("win"));
                        gameResult.setPlayersResult(getPlayerResultsFromDb(idGame));
                        gameResult.setChecksResult(getGameChecksFromDb(idGame));
                        return gameResult;
                    });
        } catch (DataAccessException e) {
            throw new DataNotFoundException("idGame", idGame);
        }
    }

    @Override
    public GameResult findById(Integer idGame, Integer idPlayer) {
        return null;
    }

    @Override
    public void addInfoFromGame(GameResult infoFromGame) throws IllegalInputDataException {
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        String sql = "INSERT INTO game (win, game_duration, id_club) " +
                "VALUES (:win, :gameDuration, :idClub)";
            parameters.addValue("win", infoFromGame.getWin());
            parameters.addValue("gameDuration", infoFromGame.getGameDuration());
            parameters.addValue("idClub", infoFromGame.getIdClub());

        jdbcTemplate.update(sql, parameters);
    }

    private List<PlayerResult> getPlayerResultsFromDb(Integer idGame) {
        List<PlayerResult> playerResults = new ArrayList<>();

        List<Map<String, Object>> rows = jdbcTemplate.queryForList(
                "SELECT first_kill_sheriff, id_role, fouls_quantity, golden_move " +
                        "FROM player_result " +
                        "WHERE id_game = :idGame",
                new MapSqlParameterSource("idGame", idGame)
        );

        for (Map<String, Object> row : rows) {
            PlayerResult playerResult = new PlayerResult();

            playerResult.setRoleInGame((Integer) row.get("id_role"));
            playerResult.setFirstKillSheriff((Boolean) row.get("first_kill_sheriff"));
            playerResult.setFoulsQuantity((Short) row.get("fouls_quantity"));
            playerResult.setGoldenMove((String) row.get("golden_move"));
            playerResults.add(playerResult);
        }

        return playerResults;
    }

    private List<CheckGame> getGameChecksFromDb(Integer idGame) {
        List<CheckGame> gameChecks = new ArrayList<>();

        List<Map<String, Object>> rows = jdbcTemplate.queryForList(
                "SELECT don_check, sheriff_check, circle_number " +
                        "FROM checks " +
                        "WHERE id_game = :idGame",
                new MapSqlParameterSource("idGame", idGame)
        );

        for (Map<String, Object> row : rows) {
            CheckGame checkGame = new CheckGame();

            checkGame.setDonCheck((Integer) row.get("mafia_check"));
            checkGame.setSheriffCheck((Integer) row.get("sheriff_check"));
            checkGame.setNumberOfTheCircle((Integer) row.get("circle_number"));
            gameChecks.add(checkGame);
        }
        return gameChecks;
    }

}
