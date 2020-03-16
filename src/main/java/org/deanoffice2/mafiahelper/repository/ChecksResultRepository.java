package org.deanoffice2.mafiahelper.repository;

import org.deanoffice2.mafiahelper.entity.CheckGame;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

@org.springframework.stereotype.Repository("checksResultRepository")

public class ChecksResultRepository implements GameRepository<CheckGame> {
    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    public ChecksResultRepository(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public CheckGame findById(Integer idGame) {
        return jdbcTemplate.queryForObject(
                "SELECT * FROM game WHERE id_game = :idGame",
                new MapSqlParameterSource("idGame", idGame),
                new BeanPropertyRowMapper<>(CheckGame.class)
        );
    }

    @Override
    public void addInfoFromGame(CheckGame infoFromGame) {
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        String sql = "INSERT INTO checks (id_game, mafia_check, sheriff_check, circle_number)" +
                "VALUES ((SELECT id_game FROM game ORDER BY id_game DESC LIMIT 1), :mafiaCheck, :sheriffCheck, :circleNumber)";
        parameters.addValue("mafiaCheck", infoFromGame.getMafiaCheck());
        parameters.addValue("sheriffCheck", infoFromGame.getSheriffCheck());
        parameters.addValue("circleNumber", infoFromGame.getNumberOfTheCircle());

        jdbcTemplate.update(sql, parameters);
    }
}
