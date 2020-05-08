package org.deanoffice2.mafiahelper.entity;

public class RoleGame {
    private Integer idRole;
    private String roleName;

    public RoleGame() {
    }

    public RoleGame(Integer idRole, String roleName) {
        this.idRole = idRole;
        this.roleName = roleName;
    }

    public Integer getIdRole() {
        return idRole;
    }

    public void setIdRole(Integer idRole) {
        this.idRole = idRole;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
}
