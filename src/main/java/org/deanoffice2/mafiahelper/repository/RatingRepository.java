package org.deanoffice2.mafiahelper.repository;

public interface RatingRepository {
    Float getPlayerRatingValue(Integer idClub, Integer idPlayer);

    void updateRatingPlayer(Integer idClub, Integer idPlayer, Float rating);
}
