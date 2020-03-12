package org.deanoffice2.mafiahelper.entity;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

//@JsonPropertyOrder({ "numberOfTheCircle", "mafiaCheck", "sheriffCheck" })
public class CheckGame implements DomainObject {
   private int numberOfTheCircle;
   private Integer mafiaCheck;
   private Integer sheriffCheck;

    public CheckGame() {
    }

    public CheckGame(int numberOfTheCircle, Integer mafiaCheck, Integer sheriffCheck) {
        this.numberOfTheCircle = numberOfTheCircle;
        this.mafiaCheck = mafiaCheck;
        this.sheriffCheck = sheriffCheck;
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
