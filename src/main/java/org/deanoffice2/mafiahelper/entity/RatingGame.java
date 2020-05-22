package org.deanoffice2.mafiahelper.entity;

public class RatingGame {
    private Integer idRating;
    private Club club;
    private Player player;
    private Float ratingValue;

    public RatingGame() {
    }

    public RatingGame(Integer idRating, Club club, Player player, Float ratingValue) {
        this.idRating = idRating;
        this.club = club;
        this.player = player;
        this.ratingValue = ratingValue;
    }

    public Integer getIdRating() {
        return idRating;
    }

    public void setIdRating(Integer idRating) {
        this.idRating = idRating;
    }

    public Club getClub() {
        return club;
    }

    public void setClub(Club club) {
        this.club = club;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public Float getRatingValue() {
        return ratingValue;
    }

    public void setRatingValue(Float ratingValue) {
        this.ratingValue = ratingValue;
    }
}
