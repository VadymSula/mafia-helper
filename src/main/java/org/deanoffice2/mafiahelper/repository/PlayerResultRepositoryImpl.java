package org.deanoffice2.mafiahelper.repository;

import org.deanoffice2.mafiahelper.entity.PlayerResult;
import org.deanoffice2.mafiahelper.entity.RoleGame;
import org.deanoffice2.mafiahelper.exceptions.DataNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import java.util.List;

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
    public PlayerResult findById(Integer idGame, Integer idPlayer) {
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("idGame", idGame);
        parameters.addValue("idPlayer", idPlayer);
        try {
            return jdbcTemplate.queryForObject(
                    "SELECT player_result.fouls_quantity, player_result.golden_move, player_result.first_kill_sheriff, player_result.is_killed, player_result.player_number, role.id_role, role.role_name " +
                            "FROM player_result " +
                            "INNER JOIN role ON player_result.id_role = role.id_role " +
                            "WHERE id_game = :idGame AND id_player = :idPlayer",
                    parameters,
                    (rs, rowName) -> {
                        PlayerResult playerResult1 = new PlayerResult();
                        RoleGame roleGame = new RoleGame();

                        roleGame.setRoleName(rs.getString("role_name"));
                        roleGame.setIdRole(rs.getInt("id_role"));
                        playerResult1.setRoleInGame(roleGame);
                        playerResult1.setGoldenMove(rs.getString("golden_move"));
                        playerResult1.setFoulsQuantity(rs.getInt("fouls_quantity"));
                        playerResult1.setPlayerNumberInGame(rs.getInt("player_number"));
                        playerResult1.setFirstKillSheriff(rs.getBoolean("first_kill_sheriff"));
                        playerResult1.setKilled(rs.getBoolean("is_killed"));
                        return playerResult1;
                    });
        } catch (DataAccessException e) {
            throw new DataNotFoundException();
        }
    }

    @Override
    public List<PlayerResult> getGamesList() {
        return null;
    }

    @Override
    public void addInfoFromGame(PlayerResult infoFromGame) {
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        String sql = "INSERT INTO player_result (id_player, id_role, fouls_quantity, golden_move, first_kill_sheriff, id_game, is_killed, player_number)" +
                "VALUES (:idPlayer, :role, :foulsQuantity, :goldenMove, :firstKillSheriff, (SELECT id_game FROM game ORDER BY id_game DESC LIMIT 1), :isKilled, :playerNumber)";
        parameters.addValue("idPlayer", infoFromGame.getIdPlayer());
        parameters.addValue("role", infoFromGame.getRoleInGame().getIdRole());
        parameters.addValue("foulsQuantity", infoFromGame.getFoulsQuantity());
        parameters.addValue("goldenMove", infoFromGame.getGoldenMove());
        parameters.addValue("firstKillSheriff", infoFromGame.isFirstKillSheriff());
        parameters.addValue("isKilled", infoFromGame.isKilled());
        parameters.addValue("playerNumber", infoFromGame.getPlayerNumberInGame());

        jdbcTemplate.update(sql, parameters);
    }
}
