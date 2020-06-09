package org.deanoffice2.mafiahelper.entity;

public class Player {
    private Integer idPlayer;
    private String nickName;
    private String gender;

    public Player() {
    }

    public Player(Integer idPlayer, String nickName, String gender) {
        this.idPlayer = idPlayer;
        this.nickName = nickName;
        this.gender = gender;
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

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}
