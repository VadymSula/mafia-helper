package org.deanoffice2.mafiahelper.entity;

import java.util.List;

public class PlayerResult implements DomainObject {
    private int idPlayer;
    private RoleGame roleInGame;
    private Integer playerNumberInGame;
    private Integer foulsQuantity;
    private boolean killed;
    private String goldenMove;
    private List<Integer> checks;
    private boolean firstKillSheriff;

    public PlayerResult() {
    }

    public PlayerResult(int idPlayer, RoleGame roleInGame, Integer playerNumberInGame, Integer foulsQuantity, String goldenMove, boolean firstKillSheriff, boolean killed, List<Integer> checks) {
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

    public RoleGame getRoleInGame() {
        return roleInGame;
    }

    public void setRoleInGame(RoleGame roleInGame) {
        this.roleInGame = roleInGame;
    }

    public Integer getFoulsQuantity() {
        return foulsQuantity;
    }

    public void setFoulsQuantity(Integer foulsQuantity) {
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

    public Integer getPlayerNumberInGame() {
        return playerNumberInGame;
    }

    public void setPlayerNumberInGame(Integer playerNumberInGame) {
        this.playerNumberInGame = playerNumberInGame;
    }
}
