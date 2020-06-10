package org.deanoffice2.mafiahelper.repository.rating;

import org.deanoffice2.mafiahelper.entity.Statistics;

import java.util.List;

public interface RatingRepository {
    Float getPlayerRatingValue(Integer idClub, Integer idPlayer);

    void updateRatingPlayer(Integer idClub, Integer idPlayer, Float rating);

    List<Statistics> getStatistics();

    Integer getPlayerGamesQuantity(Integer idClub, Integer idPlayer);

    Integer getForRoleQuantity(Integer idPlayer, String fieldName);

    void updateGamesQuantity(Integer idPlayer, Integer idClub, Integer newQuantity);

    void updateWinsQuantity(Integer idPlayer, Integer newQuantity, String fieldName);
}
