package org.deanoffice2.mafiahelper.repository.rating;

import org.deanoffice2.mafiahelper.entity.Player;
import org.deanoffice2.mafiahelper.entity.PlayerResult;
import org.deanoffice2.mafiahelper.entity.RatingGame;
import org.deanoffice2.mafiahelper.entity.Statistics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@org.springframework.stereotype.Repository("ratingRepository")

public class RatingRepositoryImpl implements RatingRepository {
    private static final Float ZERO_RATING = 0F;
    private static final Integer ZERO_GAMES = 0;
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public RatingRepositoryImpl(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }

    @Override
    public Float getPlayerRatingValue(Integer idClub, Integer idPlayer) {
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("idClub", idClub);
        parameters.addValue("idPlayer", idPlayer);
        parameters.addValue("zeroRating", ZERO_RATING);
        parameters.addValue("gamesQuantity", ZERO_GAMES);

        try {
            return namedParameterJdbcTemplate
                    .queryForObject(
                            "SELECT rating_value " +
                                    "FROM rating " +
                                    "WHERE id_club = :idClub AND id_player = :idPlayer",
                            parameters,
                            Float.class
                    );
        } catch (EmptyResultDataAccessException e) {
            namedParameterJdbcTemplate
                    .update(
                            "INSERT INTO rating (id_club, id_player, rating_value, games_quantity) " +
                                    "VALUES (:idClub, :idPlayer, :zeroRating, :gamesQuantity) ",
                            parameters
                    );
            return ZERO_RATING;
        }
    }

    @Override
    public void updateRatingPlayer(Integer idClub, Integer idPlayer, Float rating) {
        String sql = "UPDATE rating " +
                "SET rating_value = :ratingValue " +
                "WHERE id_club = :idClub AND id_player = :idPlayer";
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("idClub", idClub);
        parameters.addValue("idPlayer", idPlayer);
        parameters.addValue("ratingValue", rating);

        namedParameterJdbcTemplate.update(sql, parameters);
    }

    @Override
    public List<Statistics> getStatistics() {
        List<Statistics> statisticsList = new ArrayList<>();
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(
                "SELECT rating.rating_value, rating.games_quantity, " +
                "statistics.wins_quantity, statistics.wins_civil, statistics.wins_mafia, statistics.wins_sheriff, statistics.wins_don " +
                "FROM statistics " +
                "INNER JOIN rating ON statistics.id_rating = rating.id_rating "
        );

        for (Map<String, Object> row : rows) {
            Statistics statistics = new Statistics();
            RatingGame ratingGame = new RatingGame();
            Player player = new Player();

            player.setNickName((String) row.get("nickname"));
            ratingGame.setRatingValue((Float) row.get("rating_value"));
            ratingGame.setGames_quantity((Integer) row.get("games_quantity"));
            statistics.setWinsQuantity((Integer) row.get("wins_quantity"));
            statistics.setWinsCivil((Integer) row.get("wins_civil"));
            statistics.setWinsMafia((Integer) row.get("wins_mafia"));
            statistics.setWinsSheriff((Integer) row.get("wins_sheriff"));
            statistics.setWinsDon((Integer) row.get("wins_don"));
            ratingGame.setPlayer(player);

            statisticsList.add(statistics);
        }
        return statisticsList;
    }

    @Override
    public Integer getPlayerGamesQuantity(Integer idClub, Integer idPlayer) {
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("idClub", idClub);
        parameters.addValue("idPlayer", idPlayer);
        parameters.addValue("zeroRating", ZERO_RATING);
        parameters.addValue("gamesQuantity", ZERO_GAMES);

        try {
            return namedParameterJdbcTemplate
                    .queryForObject(
                            "SELECT games_quantity " +
                                    "FROM rating " +
                                    "WHERE id_club = :idClub AND id_player = :idPlayer",
                            parameters,
                            Integer.class
                    );
        } catch (EmptyResultDataAccessException e) {
            namedParameterJdbcTemplate
                    .update(
                            "INSERT INTO rating (id_club, id_player, rating_value, games_quantity) " +
                                    "VALUES (:idClub, :idPlayer, :zeroRating, :gamesQuantity) ",
                            parameters
                    );
            return ZERO_GAMES;
        }
    }

    @Override
    public Integer getForRoleQuantity(Integer idPlayer, String fieldName) {
        try {
            return namedParameterJdbcTemplate
                    .queryForObject(
                            " SELECT " + fieldName +
                                    " FROM statistics " +
                                    " WHERE id_player = :idPlayer",
                            new MapSqlParameterSource("idPlayer", idPlayer),
                            Integer.class
                    );
        } catch (EmptyResultDataAccessException e) {
            namedParameterJdbcTemplate
                    .update(
                            "INSERT INTO statistics (id_rating, id_player) " +
                                    "VALUES ((SELECT id_rating FROM rating WHERE id_player = :idPlayer), :idPlayer) ",
                            new MapSqlParameterSource("idPlayer", idPlayer)
                    );
            return ZERO_GAMES;
        }
    }

    @Override
    public void updateGamesQuantity(Integer idPlayer, Integer idClub, Integer newQuantity) {
        String sql = "UPDATE rating " +
                        "SET games_quantity = :newGamesQuantity " +
                        "WHERE id_club = :idClub AND id_player = :idPlayer";
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("idClub", idClub);
        parameters.addValue("idPlayer", idPlayer);
        parameters.addValue("newGamesQuantity", newQuantity);

        namedParameterJdbcTemplate.update(sql, parameters);
    }

    @Override
    public void updateWinsQuantity(Integer idPlayer, Integer newQuantity, String fieldName) {
        String sql = "UPDATE statistics " +
                "SET " + fieldName + " = :newQuantity " +
                "WHERE id_player = :idPlayer";
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("idPlayer", idPlayer);
        parameters.addValue("newQuantity", newQuantity);

        namedParameterJdbcTemplate.update(sql, parameters);
    }
}
