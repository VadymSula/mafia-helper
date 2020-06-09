package org.deanoffice2.mafiahelper.entity;

public class RatingGame {
    private Integer idRating;
    private Club club;
    private Player player;
    private Float ratingValue;
    private Integer gamesQuantity;

    public RatingGame() {
    }

    public RatingGame(
            Integer idRating,
            Club club,
            Player player,
            Float ratingValue,
            Integer gamesQuantity) {
        this.idRating = idRating;
        this.club = club;
        this.player = player;
        this.ratingValue = ratingValue;
        this.gamesQuantity = gamesQuantity;
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

    public Integer getGames_quantity() {
        return gamesQuantity;
    }

    public void setGames_quantity(Integer games_quantity) {
        this.gamesQuantity = games_quantity;
    }
}
