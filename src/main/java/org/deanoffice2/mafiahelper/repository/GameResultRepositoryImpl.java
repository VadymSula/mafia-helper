package org.deanoffice2.mafiahelper.repository;

import org.deanoffice2.mafiahelper.entity.GameResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

@org.springframework.stereotype.Repository("gameResultRepository")
public class GameResultRepositoryImpl implements GameRepository<GameResult> {
    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    public GameResultRepositoryImpl(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public GameResult findById(Integer idGame) {
        return jdbcTemplate.queryForObject(
                "SELECT * FROM game WHERE id_game = :idGame",
                new MapSqlParameterSource("idGame", idGame),
                new BeanPropertyRowMapper<>(GameResult.class)
        );
    }

    @Override
    public void addInfoFromGame(GameResult infoFromGame) {
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        String sql = "INSERT INTO game (win, game_duration, id_club) " +
                "VALUES (:win, :gameDuration, :idClub)";
        parameters.addValue("win", infoFromGame.getWin());
        parameters.addValue("gameDuration", infoFromGame.getGameDuration());
        parameters.addValue("idClub", infoFromGame.getIdClub());

        jdbcTemplate.update(sql, parameters);
    }
}
