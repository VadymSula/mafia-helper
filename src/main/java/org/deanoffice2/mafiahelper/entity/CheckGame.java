package org.deanoffice2.mafiahelper.entity;

public class CheckGame implements DomainObject {
   private int numberOfTheCircle;
   private Integer donCheck;
   private Integer sheriffCheck;

    public CheckGame() {
    }

    public CheckGame(int numberOfTheCircle, Integer mafiaCheck, Integer sheriffCheck) {
        this.numberOfTheCircle = numberOfTheCircle;
        this.donCheck = mafiaCheck;
        this.sheriffCheck = sheriffCheck;
    }

    public int getNumberOfTheCircle() {
        return numberOfTheCircle;
    }

    public void setNumberOfTheCircle(int numberOfTheCircle) {
        this.numberOfTheCircle = numberOfTheCircle;
    }

    public Integer getDonCheck() {
        return donCheck;
    }

    public void setDonCheck(Integer donCheck) {
        this.donCheck = donCheck;
    }

    public Integer getSheriffCheck() {
        return sheriffCheck;
    }

    public void setSheriffCheck(Integer sheriffCheck) {
        this.sheriffCheck = sheriffCheck;
    }
}
