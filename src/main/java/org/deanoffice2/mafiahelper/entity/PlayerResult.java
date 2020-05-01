package org.deanoffice2.mafiahelper.entity;

import java.util.List;

public class PlayerResult implements DomainObject {
    private int idPlayer;
    private Integer roleInGame;
    private short playerNumberInGame;
    private short foulsQuantity;
    private boolean killed;
    private String goldenMove;
    private List<Integer> checks;
    private boolean firstKillSheriff;

    public PlayerResult() {
    }

    public PlayerResult(int idPlayer, Integer roleInGame, byte playerNumberInGame, short foulsQuantity, String goldenMove, boolean firstKillSheriff, boolean killed, List<Integer> checks) {
        this.idPlayer = idPlayer;
        this.roleInGame = roleInGame;
        this.playerNumberInGame = playerNumberInGame;
        this.foulsQuantity = foulsQuantity;
        this.goldenMove = goldenMove;
        this.firstKillSheriff = firstKillSheriff;
        this.killed = killed;
        this.checks = checks;
    }

    public int getIdPlayer() {
        return idPlayer;
    }

    public void setIdPlayer(int idPlayer) {
        this.idPlayer = idPlayer;
    }

    public Integer getRoleInGame() {
        return roleInGame;
    }

    public void setRoleInGame(Integer roleInGame) {
        this.roleInGame = roleInGame;
    }

    public short getFoulsQuantity() {
        return foulsQuantity;
    }

    public void setFoulsQuantity(short foulsQuantity) {
        this.foulsQuantity = foulsQuantity;
    }

    public String getGoldenMove() {
        return goldenMove;
    }

    public void setGoldenMove(String goldenMove) {
        this.goldenMove = goldenMove;
    }

    public boolean isFirstKillSheriff() {
        return firstKillSheriff;
    }

    public void setFirstKillSheriff(boolean firstKillSheriff) {
        this.firstKillSheriff = firstKillSheriff;
    }

    public boolean isKilled() {
        return killed;
    }

    public void setKilled(boolean killed) {
        this.killed = killed;
    }

    public List<Integer> getChecks() {
        return checks;
    }

    public void setChecks(List<Integer> checks) {
        this.checks = checks;
    }

    public short getPlayerNumberInGame() {
        return playerNumberInGame;
    }

    public void setPlayerNumberInGame(short playerNumberInGame) {
        this.playerNumberInGame = playerNumberInGame;
    }
}
