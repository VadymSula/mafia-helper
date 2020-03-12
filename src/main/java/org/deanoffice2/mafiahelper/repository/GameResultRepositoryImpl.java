package org.deanoffice2.mafiahelper.repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.deanoffice2.mafiahelper.entity.CheckGame;
import org.deanoffice2.mafiahelper.entity.GameResult;
import org.deanoffice2.mafiahelper.entity.PlayerResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@org.springframework.stereotype.Repository("gameResultRepository")
public class GameResultRepositoryImpl implements GameResultRepository<GameResult> {
    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    public GameResultRepositoryImpl(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public GameResult findGameById(Integer idGame) {
        return jdbcTemplate.queryForObject(
                "SELECT * FROM game WHERE id_game = :idGame",
                new MapSqlParameterSource("idGame", idGame),
                new BeanPropertyRowMapper<>(GameResult.class)
        );
    }

    @Override
    public void addGameResult(GameResult gameResult) {
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        String sql = "INSERT INTO game (win, game_duration, id_club) " +
                "VALUES (:win, :gameDuration, :idClub)";
        parameters.addValue("win", gameResult.getWin());
        parameters.addValue("gameDuration", gameResult.getGameDuration());
        parameters.addValue("idClub", gameResult.getIdClub());

        jdbcTemplate.update(sql, parameters);
    }

    @Override
    public void addPlayerResult(PlayerResult playerResult) {
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        String sql = "INSERT INTO player_result (id_person, role, fouls_quantity, golden_move, first_kill_sheriff, id_game)" +
                "VALUES (:idPerson, :role, :foulsQuantity, :goldenMove, :firstKillSheriff, (SELECT id_game FROM game ORDER BY id_game DESC LIMIT 1))";
        parameters.addValue("idPerson", playerResult.getIdPerson());
        parameters.addValue("role", playerResult.getRoleInGame());
        parameters.addValue("foulsQuantity", playerResult.getFoulsQuantity());
        parameters.addValue("goldenMove", playerResult.getGoldenMove());
        parameters.addValue("firstKillSheriff", playerResult.isFirstKillSheriff());

        jdbcTemplate.update(sql, parameters);
    }

    @Override
    public void addChecksResult(CheckGame checkGame) {
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        String sql = "INSERT INTO checks (id_game, mafia_check, sheriff_check, circle_number)" +
                "VALUES ((SELECT id_game FROM game ORDER BY id_game DESC LIMIT 1), :mafiaCheck, :sheriffCheck, :circleNumber)";
        parameters.addValue("mafiaCheck", checkGame.getMafiaCheck());
        parameters.addValue("sheriffCheck", checkGame.getSheriffCheck());
        parameters.addValue("circleNumber", checkGame.getNumberOfTheCircle());

        jdbcTemplate.update(sql, parameters);
    }
}
