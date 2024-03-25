package com.employee_agency.employee_agency.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class User {
    @Id
    private String username;
    
    private String password;
    private String userType;
    private Boolean isActive;
    private Boolean firstLogin;
    

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserType() {
        return userType;
    }
    public void setUserType(String userType) {
        this.userType = userType;
    }

    public Boolean getState() {
        return isActive;
    }
    public void setPhone(Boolean isActive) {
        this.isActive = isActive;
    }

    public Boolean getFirstLogin() {
        return firstLogin;
    }
    public void setFirstLogin(Boolean firstLogin) {
        this.firstLogin = firstLogin;
    }

}
