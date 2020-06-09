package org.deanoffice2.mafiahelper.repository;

import org.deanoffice2.mafiahelper.entity.CheckGame;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@org.springframework.stereotype.Repository("checksResultRepository")

public class ChecksResultRepository implements GameRepository<CheckGame>, GameListRepository<CheckGame> {
    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    public ChecksResultRepository(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public CheckGame findById(Integer idGame) {
        return jdbcTemplate.queryForObject(
                "SELECT don_check, sheriff_check, circle_number " +
                        "FROM checks " +
                        "WHERE id_game = :idGame",
                new MapSqlParameterSource("idGame", idGame),
                new BeanPropertyRowMapper<>(CheckGame.class)
        );
    }

    @Override
    public CheckGame findById(Integer idGame, Integer idPlayer) {
        return null;
    }

    @Override
    public List<CheckGame> getGamesList() {
        return null;
    }

    @Override
    public List<CheckGame> findListById(Integer idGame) {
        List<CheckGame> checksGame = new ArrayList<>();

        List<Map<String, Object>> rows = jdbcTemplate.queryForList(
                "SELECT don_check, sheriff_check, circle_number " +
                        "FROM checks " +
                        "WHERE id_game = :idGame",
                new MapSqlParameterSource("idGame", idGame)
        );

        for (Map<String, Object> row : rows) {
            CheckGame checkGame = new CheckGame();

            checkGame.setNumberOfTheCircle((Integer) row.get("circle_number"));
            checkGame.setSheriffCheck((Integer) row.get("sheriff_check"));
            checkGame.setDonCheck((Integer) row.get("mafia_check"));
            checksGame.add(checkGame);
        }
        return checksGame;
    }

    @Override
    public void addInfoFromGame(CheckGame infoFromGame) {
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        String sql = "INSERT INTO checks (id_game, don_check, sheriff_check, circle_number)" +
                "VALUES ((SELECT id_game FROM game ORDER BY id_game DESC LIMIT 1), :mafiaCheck, :sheriffCheck, :circleNumber)";
        parameters.addValue("mafiaCheck", infoFromGame.getDonCheck());
        parameters.addValue("sheriffCheck", infoFromGame.getSheriffCheck());
        parameters.addValue("circleNumber", infoFromGame.getNumberOfTheCircle());

        jdbcTemplate.update(sql, parameters);
    }
}
