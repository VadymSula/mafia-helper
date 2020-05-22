package org.deanoffice2.mafiahelper.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

@org.springframework.stereotype.Repository("ratingRepository")

public class RatingRepositoryImpl implements RatingRepository {
    private static final Float ZERO_RATING = 0F;
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
                            "INSERT INTO rating (id_club, id_player, rating_value) " +
                                    "VALUES (:idClub, :idPlayer, :zeroRating) ",
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
}
