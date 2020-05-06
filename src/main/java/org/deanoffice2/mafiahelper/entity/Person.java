package org.deanoffice2.mafiahelper.entity;

public class Person {
    private Integer idPerson;
    private String personName;
    private String personSurname;
    private String biography;

    public Person() {
    }

    public Person(Integer idPerson, String personName, String personSurname, String biography) {
        this.idPerson = idPerson;
        this.personName = personName;
        this.personSurname = personSurname;
        this.biography = biography;
    }

    public Integer getIdPerson() {
        return idPerson;
    }

    public void setIdPerson(Integer idPerson) {
        this.idPerson = idPerson;
    }

    public String getPersonName() {
        return personName;
    }

    public void setPersonName(String personName) {
        this.personName = personName;
    }

    public String getPersonSurname() {
        return personSurname;
    }

    public void setPersonSurname(String personSurname) {
        this.personSurname = personSurname;
    }

    public String getBiography() {
        return biography;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }
}
