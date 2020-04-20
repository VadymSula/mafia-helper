package org.deanoffice2.mafiahelper.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import java.util.HashMap;
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
    public Map<Integer, String> findRolesForSelectList() {
        Map<Integer, String> rolesMap = new HashMap<>();
        String sql = "SELECT * FROM role";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);

        for (Map<String, Object> row : rows) {
            rolesMap.put((Integer) row.get("id_role"), (String) row.get("role_name"));
        }

        return rolesMap;
    }

    @Override
    public Integer findByName(String name) {
        return namedParameterJdbcTemplate
                .queryForObject(
                        "SELECT id_role " +
                                "FROM role " +
                                "WHERE role_name = :roleName",
                        new MapSqlParameterSource("roleName", name),
                        new BeanPropertyRowMapper<>(Integer.class)
                );
    }

    @Override
    public void addNewPlayer(String playerName) {
        String sql = "INSERT INTO player (nickname) VALUES (:nickname)";
        namedParameterJdbcTemplate
                .update(sql, new MapSqlParameterSource("nickname", playerName));
    }
}
