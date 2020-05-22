package org.deanoffice2.mafiahelper.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class GameResult implements DomainObject {
    @JsonIgnore
    private Integer idGame;
    private Club club;
    private boolean gameIsRating;
    private String win;
    private List<PlayerResult> playersResult = new ArrayList<>();
    private List<CheckGame> checksResult = new ArrayList<>();
    private String gameDuration;
    private Date gameDate;

    public GameResult() {
    }

    public GameResult(
            Integer idGame,
            Club club,
            boolean gameIsRating,
            String win,
            List<PlayerResult> playersResult,
            List<CheckGame> checksResult,
            String gameDuration,
            Date gameDate) {
        this.idGame = idGame;
        this.club = club;
        this.gameIsRating = gameIsRating;
        this.win = win;
        this.playersResult = playersResult;
        this.checksResult = checksResult;
        this.gameDuration = gameDuration;
        this.gameDate = gameDate;
    }

    public Integer getIdGame() {
        return idGame;
    }

    public void setIdGame(Integer idGame) {
        this.idGame = idGame;
    }

    public Club getClub() {
        return club;
    }

    public void setClub(Club club) {
        this.club = club;
    }

    public String getWin() {
        return win;
    }

    public void setWin(String win) {
        this.win = win;
    }

    public List<PlayerResult> getPlayersResult() {
        return playersResult;
    }

    public void setPlayersResult(List<PlayerResult> playersResult) {
        this.playersResult = playersResult;
    }

    public List<CheckGame> getChecksResult() {
        return checksResult;
    }

    public void setChecksResult(List<CheckGame> checksResult) {
        this.checksResult = checksResult;
    }

    public String getGameDuration() {
        return gameDuration;
    }

    public void setGameDuration(String gameDuration) {
        this.gameDuration = gameDuration;
    }

    public Date getGameDate() {
        return gameDate;
    }

    public void setGameDate(Date gameDate) {
        this.gameDate = gameDate;
    }

    public boolean isGameIsRating() {
        return gameIsRating;
    }

    public void setGameIsRating(boolean gameIsRating) {
        this.gameIsRating = gameIsRating;
    }
}
