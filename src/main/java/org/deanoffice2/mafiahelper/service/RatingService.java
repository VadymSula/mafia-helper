package org.deanoffice2.mafiahelper.service;

import org.deanoffice2.mafiahelper.entity.GameResult;
import org.deanoffice2.mafiahelper.entity.RatingGame;

import java.util.List;

public interface RatingService {
    void updateRatingForMajorPoints(GameResult gameResult);

    void updateRatingForExtraPoints(List<RatingGame> ratingList);
}
