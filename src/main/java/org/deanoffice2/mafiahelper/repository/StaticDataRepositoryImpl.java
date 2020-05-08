package org.deanoffice2.mafiahelper.repository;

import org.deanoffice2.mafiahelper.entity.Player;
import org.deanoffice2.mafiahelper.entity.RoleGame;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@org.springframework.stereotype.Repository("staticDataRepository")

public class StaticDataRepositoryImpl implements StaticDataRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public StaticDataRepositoryImpl(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }

    @Override
    public List<RoleGame> findRolesForSelectList() {
        List<RoleGame> rolesList = new ArrayList<>();
        String sql = "SELECT * FROM role";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);

        for (Map<String, Object> row : rows) {
            RoleGame roleGame = new RoleGame();

            roleGame.setIdRole((Integer) row.get("id_role"));
            roleGame.setRoleName((String) row.get("role_name"));

            rolesList.add(roleGame);
        }

        return rolesList;
    }

    @Override
    public Integer findByName(String name) {
        return namedParameterJdbcTemplate
                .queryForObject(
                        "SELECT id_role " +
                                "FROM role " +
                                "WHERE role_name = :roleName",
                        new MapSqlParameterSource("roleName", name),
                        (Integer.class)
                );
    }

    @Override
    public void addNewPlayer(String playerName) {
        String sql = "INSERT INTO player (nickname) VALUES (:nickname)";
        namedParameterJdbcTemplate
                .update(sql, new MapSqlParameterSource("nickname", playerName));
    }

    @Override
    public List<Player> getNicknamePlayers() {
        List<Player> playersList = new ArrayList<>();
        String sql = "SELECT * FROM player";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);

        for (Map<String, Object> row : rows) {
            Player player = new Player();

            player.setIdPlayer((Integer) row.get("id_player"));
            player.setNickName((String) row.get("nickname"));

            playersList.add(player);
        }
        return playersList;
    }
}
