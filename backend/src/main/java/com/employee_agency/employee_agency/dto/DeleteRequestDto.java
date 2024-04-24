package com.employee_agency.employee_agency.dto;

public class DeleteRequestDto {
    public String username;
    public String comment;

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public String getComment() {
        return comment;
    }
    public void setComment(String comment) {
        this.comment = comment;
    }
}
