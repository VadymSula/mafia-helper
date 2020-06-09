package org.deanoffice2.mafiahelper.repository;

import org.deanoffice2.mafiahelper.entity.*;
import org.deanoffice2.mafiahelper.exceptions.DataNotFoundException;
import org.deanoffice2.mafiahelper.exceptions.IllegalInputDataException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@org.springframework.stereotype.Repository("gameResultRepository")
public class GameResultRepositoryImpl implements GameRepository<GameResult> {
    private final NamedParameterJdbcTemplate parameterJdbcTemplate;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public GameResultRepositoryImpl(NamedParameterJdbcTemplate parameterJdbcTemplate) {
        this.parameterJdbcTemplate = parameterJdbcTemplate;
    }

    @Override
    public GameResult findById(Integer idGame) {
        try {
            return parameterJdbcTemplate.queryForObject(
                    "SELECT game.win, game.game_duration, game.game_date, game.game_is_rating, " +
                            "club.club_name " +
                            "FROM game " +
                            "JOIN club ON game.id_club = club.id_club " +
                            "WHERE game.id_game = :idGame ",
                    new MapSqlParameterSource("idGame", idGame),
                    (rs, rowName) -> {
                        GameResult gameResult = new GameResult();
                        Club club = new Club();

                        club.setClubName(rs.getString("club_name"));
                        gameResult.setGameDuration(rs.getString("game_duration"));
                        gameResult.setWin(rs.getString("win"));
                        gameResult.setGameIsRating(rs.getBoolean("game_is_rating"));
                        gameResult.setGameDate(rs.getDate("game_date"));
                        gameResult.setClub(club);
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
    public List<GameResult> getGamesList() {
        List<GameResult> gameResults = new ArrayList<>();
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(
                "SELECT game.id_game, game.win, game.game_duration, game.game_date, game.game_is_rating, " +
                        "club.club_name, club.id_club " +
                        "FROM game " +
                        "JOIN club ON game.id_club = club.id_club "
        );

        for (Map<String, Object> row : rows) {
            GameResult gameResult = new GameResult();
            Club club = new Club();

            club.setIdClub((Integer) row.get("id_club"));
            club.setClubName((String) row.get("club_name"));
            gameResult.setGameDate((Date) row.get("game_date"));
            gameResult.setWin((String) row.get("win"));
            gameResult.setGameDuration((String) row.get("game_duration"));
            gameResult.setGameIsRating((Boolean) row.get("game_is_rating"));
            gameResult.setClub(club);
            gameResult.setChecksResult(getGameChecksFromDb((Integer) row.get("id_game")));
            gameResult.setPlayersResult(getPlayerResultsFromDb((Integer) row.get("id_game")));

            gameResults.add(gameResult);
        }
        return gameResults;
    }

    @Override
    public void addInfoFromGame(GameResult infoFromGame) throws IllegalInputDataException {
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        String sql = "INSERT INTO game (win, game_duration, id_club, game_date, game_is_rating) " +
                "VALUES (:win, :gameDuration, :idClub, :gameDate, :gameIsRating)";
        parameters.addValue("win", infoFromGame.getWin());
        parameters.addValue("gameDuration", infoFromGame.getGameDuration());
        parameters.addValue("idClub", infoFromGame.getClub().getIdClub());
        parameters.addValue("gameDate", infoFromGame.getGameDate());
        parameters.addValue("gameIsRating", infoFromGame.isGameIsRating());

        parameterJdbcTemplate.update(sql, parameters);
    }

    private List<PlayerResult> getPlayerResultsFromDb(Integer idGame) {
        List<PlayerResult> playerResults = new ArrayList<>();

        List<Map<String, Object>> rows = parameterJdbcTemplate.queryForList(
                "SELECT player_result.fouls_quantity, player_result.golden_move, player_result.first_kill_sheriff, player_result.is_killed, player_result.player_number, role.role_name " +
                        "FROM player_result " +
                        "INNER JOIN role ON player_result.id_role = role.id_role " +
                        "WHERE id_game = :idGame",
                new MapSqlParameterSource("idGame", idGame)
        );

        for (Map<String, Object> row : rows) {
            PlayerResult playerResult = new PlayerResult();
            RoleGame roleGame = new RoleGame();

            roleGame.setRoleName((String) row.get("role_name"));
            playerResult.setRoleInGame(roleGame);
            playerResult.setKilled((Boolean) row.get("is_killed"));
            playerResult.setFirstKillSheriff((Boolean) row.get("first_kill_sheriff"));
            playerResult.setFoulsQuantity((Integer) row.get("fouls_quantity"));
            playerResult.setPlayerNumberInGame((Integer) row.get("player_number"));
            playerResult.setGoldenMove((String) row.get("golden_move"));
            playerResults.add(playerResult);
        }

        return playerResults;
    }

    private List<CheckGame> getGameChecksFromDb(Integer idGame) {
        List<CheckGame> gameChecks = new ArrayList<>();

        List<Map<String, Object>> rows = parameterJdbcTemplate.queryForList(
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
