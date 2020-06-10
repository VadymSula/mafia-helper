package org.deanoffice2.mafiahelper.entity;

public class Statistics {
    private Integer idStat;
    private RatingGame ratingGame;
    private Integer winsQuantity;
    private Integer winsCivil;
    private Integer winsMafia;
    private Integer winsSheriff;
    private Integer winsDon;
    private Integer gamesCivilQuantity;
    private Integer gamesMafiaQuantity;
    private Integer gamesSheriffQuantity;
    private Integer gamesDonQuantity;
    private Integer leadGamesQuantity;

    public Statistics() {
    }

    public Statistics(
            Integer idStat,
            RatingGame ratingGame,
            Integer winsQuantity,
            Integer winsCivil,
            Integer winsMafia,
            Integer winsSheriff,
            Integer winsDon,
            Integer leadGamesQuantity,
            Integer gamesCivilQuantity,
            Integer gamesMafiaQuantity,
            Integer gamesSheriffQuantity,
            Integer gamesDonQuantity
            ) {
        this.idStat = idStat;
        this.ratingGame = ratingGame;
        this.winsQuantity = winsQuantity;
        this.winsCivil = winsCivil;
        this.winsMafia = winsMafia;
        this.winsSheriff = winsSheriff;
        this.winsDon = winsDon;
        this.leadGamesQuantity = leadGamesQuantity;
        this.gamesCivilQuantity = gamesCivilQuantity;
        this.gamesMafiaQuantity = gamesMafiaQuantity;
        this.gamesSheriffQuantity = gamesSheriffQuantity;
        this.gamesDonQuantity = gamesDonQuantity;
    }


    public Integer getIdStat() {
        return idStat;
    }

    public void setIdStat(Integer idStat) {
        this.idStat = idStat;
    }

    public RatingGame getRatingGame() {
        return ratingGame;
    }

    public void setRatingGame(RatingGame ratingGame) {
        this.ratingGame = ratingGame;
    }

    public Integer getWinsQuantity() {
        return winsQuantity;
    }

    public void setWinsQuantity(Integer winsQuantity) {
        this.winsQuantity = winsQuantity;
    }

    public Integer getWinsCivil() {
        return winsCivil;
    }

    public void setWinsCivil(Integer winsCivil) {
        this.winsCivil = winsCivil;
    }

    public Integer getWinsMafia() {
        return winsMafia;
    }

    public void setWinsMafia(Integer winsMafia) {
        this.winsMafia = winsMafia;
    }

    public Integer getWinsSheriff() {
        return winsSheriff;
    }

    public void setWinsSheriff(Integer winsSheriff) {
        this.winsSheriff = winsSheriff;
    }

    public Integer getWinsDon() {
        return winsDon;
    }

    public void setWinsDon(Integer winsDon) {
        this.winsDon = winsDon;
    }

    public Integer getLeadGamesQuantity() {
        return leadGamesQuantity;
    }

    public void setLeadGamesQuantity(Integer leadGamesQuantity) {
        this.leadGamesQuantity = leadGamesQuantity;
    }

    public Integer getGamesCivilQuantity() {
        return gamesCivilQuantity;
    }

    public void setGamesCivilQuantity(Integer gamesCivilQuantity) {
        this.gamesCivilQuantity = gamesCivilQuantity;
    }

    public Integer getGamesMafiaQuantity() {
        return gamesMafiaQuantity;
    }

    public void setGamesMafiaQuantity(Integer gamesMafiaQuantity) {
        this.gamesMafiaQuantity = gamesMafiaQuantity;
    }

    public Integer getGamesSheriffQuantity() {
        return gamesSheriffQuantity;
    }

    public void setGamesSheriffQuantity(Integer gamesSheriffQuantity) {
        this.gamesSheriffQuantity = gamesSheriffQuantity;
    }

    public Integer getGamesDonQuantity() {
        return gamesDonQuantity;
    }

    public void setGamesDonQuantity(Integer gamesDonQuantity) {
        this.gamesDonQuantity = gamesDonQuantity;
    }
}