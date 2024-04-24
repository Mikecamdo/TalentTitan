package com.employee_agency.employee_agency.dto;

public class ApproveRequestDto {
    public String username;
    public String amountDue;
    public String dueDate;
    public String comment;

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public String getAmountDue() {
        return amountDue;
    }
    public void setAmountDue(String amountDue) {
        this.amountDue = amountDue;
    }

    public String getDueDate() {
        return dueDate;
    }
    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    public String getComment() {
        return comment;
    }
    public void setComment(String comment) {
        this.comment = comment;
    }
}
