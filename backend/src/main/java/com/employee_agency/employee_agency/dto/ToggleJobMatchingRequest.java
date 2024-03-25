package com.employee_agency.employee_agency.dto;

public class ToggleJobMatchingRequest {
    private String professionalUsername;
    private Boolean jobMatching;
    
    public String getProfessionalUsername() {
        return professionalUsername;
    }
    public void setProfessionalUsername(String professionalUsername) {
        this.professionalUsername = professionalUsername;
    }

    public Boolean getJobMatching() {
        return jobMatching;
    }
    public void setJobMatching(Boolean jobMatching) {
        this.jobMatching = jobMatching;
    }
}
