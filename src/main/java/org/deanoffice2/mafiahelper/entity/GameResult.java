package org.deanoffice2.mafiahelper.entity;

import java.util.ArrayList;
import java.util.List;

public class GameResult implements DomainObject {
    private int idGame;
    private String clubName;
    private String win;
    private List<PlayerResult> playersResult = new ArrayList<>();
    private List<CheckGame> checksResult = new ArrayList<>();
    private String gameDuration;

    public GameResult() {
    }

    public GameResult(int idGame, String clubName, String win, List<PlayerResult> playersResult, List<CheckGame> checksResult, String gameDuration) {
        this.idGame = idGame;
        this.clubName = clubName;
        this.win = win;
        this.playersResult = playersResult;
        this.checksResult = checksResult;
        this.gameDuration = gameDuration;
    }

    public int getIdGame() {
        return idGame;
    }

    public void setIdGame(int idGame) {
        this.idGame = idGame;
    }

    public String getClubName() {
        return clubName;
    }

    public void setClubName(String clubName) {
        this.clubName = clubName;
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
}
