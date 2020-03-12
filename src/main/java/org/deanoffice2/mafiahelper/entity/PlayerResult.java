package org.deanoffice2.mafiahelper.entity;

public class PlayerResult implements DomainObject {
    private int idPerson;
    private int idGame;
    private String roleInGame;
    private int foulsQuantity;
    private String goldenMove;
    private boolean firstKillSheriff;

    public PlayerResult() {
    }

    public PlayerResult(int idPerson, int idGame, String roleInGame, int foulsQuantity, String goldenMove, boolean firstKillSheriff) {
        this.idPerson = idPerson;
        this.idGame = idGame;
        this.roleInGame = roleInGame;
        this.foulsQuantity = foulsQuantity;
        this.goldenMove = goldenMove;
        this.firstKillSheriff = firstKillSheriff;
    }

    public int getIdPerson() {
        return idPerson;
    }

    public void setIdPerson(int idPerson) {
        this.idPerson = idPerson;
    }

    public int getIdGame() {
        return idGame;
    }

    public void setIdGame(int idGame) {
        this.idGame = idGame;
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
}
