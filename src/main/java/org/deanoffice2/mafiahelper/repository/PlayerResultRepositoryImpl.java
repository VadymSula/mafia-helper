package org.deanoffice2.mafiahelper.repository;

import org.deanoffice2.mafiahelper.entity.PlayerResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

@org.springframework.stereotype.Repository("playerResultRepository")

public class PlayerResultRepositoryImpl implements GameRepository<PlayerResult> {
    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    public PlayerResultRepositoryImpl(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public PlayerResult findById(Integer id) {
        return jdbcTemplate.queryForObject(
                "SELECT * FROM player_result WHERE id_game = :idGame",
                new MapSqlParameterSource("idGame", id),
                new BeanPropertyRowMapper<>(PlayerResult.class)
        );
    }

    @Override
    public void addInfoFromGame(PlayerResult infoFromGame) {
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        String sql = "INSERT INTO player_result (id_person, role, fouls_quantity, golden_move, first_kill_sheriff, id_game)" +
                "VALUES (:idPerson, :role, :foulsQuantity, :goldenMove, :firstKillSheriff, (SELECT id_game FROM game ORDER BY id_game DESC LIMIT 1))";
        parameters.addValue("idPerson", infoFromGame.getIdPerson());
        parameters.addValue("role", infoFromGame.getRoleInGame());
        parameters.addValue("foulsQuantity", infoFromGame.getFoulsQuantity());
        parameters.addValue("goldenMove", infoFromGame.getGoldenMove());
        parameters.addValue("firstKillSheriff", infoFromGame.isFirstKillSheriff());

        jdbcTemplate.update(sql, parameters);
    }
}
