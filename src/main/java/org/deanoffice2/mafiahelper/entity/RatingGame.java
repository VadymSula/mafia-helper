package org.deanoffice2.mafiahelper.entity;

public class RatingGame {
    private Integer idRating;
    private Integer idClub;
    private Integer idPlayer;
    private Float ratingValue;

    public RatingGame() {
    }

    public RatingGame(Integer idRating, Integer idClub, Integer idPlayer, Float ratingValue) {
        this.idRating = idRating;
        this.idClub = idClub;
        this.idPlayer = idPlayer;
        this.ratingValue = ratingValue;
    }

    public Integer getIdRating() {
        return idRating;
    }

    public void setIdRating(Integer idRating) {
        this.idRating = idRating;
    }

    public Integer getIdClub() {
        return idClub;
    }

    public void setIdClub(Integer idClub) {
        this.idClub = idClub;
    }

    public Integer getIdPlayer() {
        return idPlayer;
    }

    public void setIdPlayer(Integer idPlayer) {
        this.idPlayer = idPlayer;
    }

    public Float getRatingValue() {
        return ratingValue;
    }

    public void setRatingValue(Float ratingValue) {
        this.ratingValue = ratingValue;
    }
}
