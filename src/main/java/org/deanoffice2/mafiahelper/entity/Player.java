package org.deanoffice2.mafiahelper.entity;

public class Player {
    private Integer idPlayer;
    private String nickName;

    public Player() {
    }

    public Player(Integer idPlayer, String nickName) {
        this.idPlayer = idPlayer;
        this.nickName = nickName;
    }

    public Integer getIdPlayer() {
        return idPlayer;
    }

    public void setIdPlayer(Integer idPlayer) {
        this.idPlayer = idPlayer;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }
}
