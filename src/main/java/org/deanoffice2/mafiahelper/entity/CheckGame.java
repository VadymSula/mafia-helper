package org.deanoffice2.mafiahelper.entity;

public class CheckGame implements DomainObject {
   private int idGame;
   private int numberOfTheCircle;
   private Integer mafiaCheck;
   private Integer sheriffCheck;

    public CheckGame() {
    }

    public CheckGame(int idGame, int numberOfTheCircle, Integer mafiaCheck, Integer sheriffCheck) {
        this.idGame = idGame;
        this.numberOfTheCircle = numberOfTheCircle;
        this.mafiaCheck = mafiaCheck;
        this.sheriffCheck = sheriffCheck;
    }

    public int getIdGame() {
        return idGame;
    }

    public void setIdGame(int idGame) {
        this.idGame = idGame;
    }

    public int getNumberOfTheCircle() {
        return numberOfTheCircle;
    }

    public void setNumberOfTheCircle(int numberOfTheCircle) {
        this.numberOfTheCircle = numberOfTheCircle;
    }

    public Integer getMafiaCheck() {
        return mafiaCheck;
    }

    public void setMafiaCheck(Integer mafiaCheck) {
        this.mafiaCheck = mafiaCheck;
    }

    public Integer getSheriffCheck() {
        return sheriffCheck;
    }

    public void setSheriffCheck(Integer sheriffCheck) {
        this.sheriffCheck = sheriffCheck;
    }
}
