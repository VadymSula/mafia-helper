package org.deanoffice2.mafiahelper.entity;

public class PlayerResult {
    private int idPlayer;
    private int idGame;
    private String roleInGame;
    private int foulsQuantity;
    private String goldenMove;
    private boolean firstKillSheriff;

    public PlayerResult(int idPlayer, int idGame, String roleInGame, int foulsQuantity, String goldenMove, boolean firstKillSheriff) {
        this.idPlayer = idPlayer;
        this.idGame = idGame;
        this.roleInGame = roleInGame;
        this.foulsQuantity = foulsQuantity;
        this.goldenMove = goldenMove;
        this.firstKillSheriff = firstKillSheriff;
    }

    public int getIdPlayer() {
        return idPlayer;
    }

    public void setIdPlayer(int idPlayer) {
        this.idPlayer = idPlayer;
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
