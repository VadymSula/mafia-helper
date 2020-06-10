package org.deanoffice2.mafiahelper.service;

import org.deanoffice2.mafiahelper.entity.GameResult;
import org.deanoffice2.mafiahelper.entity.RatingGame;
import org.deanoffice2.mafiahelper.entity.Statistics;

import java.util.List;

public interface RatingService {
    void updateRatingForMajorPoints(GameResult gameResult);

    void updateRatingForExtraPoints(List<RatingGame> ratingList);

    List<Statistics> getStatisticsPlayers();

    void updateRatingIndicators(GameResult gameResult);
}
