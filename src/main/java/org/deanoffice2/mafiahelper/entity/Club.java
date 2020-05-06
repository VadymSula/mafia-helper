package org.deanoffice2.mafiahelper.entity;

public class Club {
    private Integer idClub;
    private String clubName;

    public Club() {
    }

    public Club(Integer idClub, String clubName) {
        this.idClub = idClub;
        this.clubName = clubName;
    }

    public Integer getIdClub() {
        return idClub;
    }

    public void setIdClub(Integer idClub) {
        this.idClub = idClub;
    }

    public String getClubName() {
        return clubName;
    }

    public void setClubName(String clubName) {
        this.clubName = clubName;
    }
}
