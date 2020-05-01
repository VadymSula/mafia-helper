package org.deanoffice2.mafiahelper.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class GameResult implements DomainObject {
    @JsonIgnore
    private Integer idGame;
    private Integer idClub;
    private String win;
    private List<PlayerResult> playersResult = new ArrayList<>();
    private List<CheckGame> checksResult = new ArrayList<>();
    private String gameDuration;
    private Date gameDate;

    public GameResult() {
    }

    public GameResult(int idGame, int idClub, String win, List<PlayerResult> playersResult, List<CheckGame> checksResult, String gameDuration, Date gameDate) {
        this.idGame = idGame;
        this.idClub = idClub;
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

    public Integer getIdClub() {
        return idClub;
    }

    public void setIdClub(Integer idClub) {
        this.idClub = idClub;
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
}
