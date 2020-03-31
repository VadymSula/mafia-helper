package org.deanoffice2.mafiahelper.entity;

import java.util.List;

public class PlayerResult implements DomainObject {
    private int idPerson;
    private String roleInGame;
    private int foulsQuantity;
    private boolean killed;
    private String goldenMove;
    private List<Integer> checks;

    private boolean firstKillSheriff;

    public PlayerResult() {
    }

    public PlayerResult(int idPerson, String roleInGame, int foulsQuantity, String goldenMove, boolean firstKillSheriff, boolean killed, List<Integer> checks) {
        this.idPerson = idPerson;
        this.roleInGame = roleInGame;
        this.foulsQuantity = foulsQuantity;
        this.goldenMove = goldenMove;
        this.firstKillSheriff = firstKillSheriff;
        this.killed = killed;
        this.checks = checks;
    }

    public int getIdPerson() {
        return idPerson;
    }

    public void setIdPerson(int idPerson) {
        this.idPerson = idPerson;
    }

    public String getRoleInGame() {
        return roleInGame;
    }

    public void setRoleInGame(String roleInGame) {
        this.roleInGame = roleInGame;
    }

    public int getFoulsQuantity() {
        return foulsQuantity;
    }

    public void setFoulsQuantity(int foulsQuantity) {
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
}
