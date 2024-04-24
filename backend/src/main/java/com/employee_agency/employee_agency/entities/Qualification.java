package com.employee_agency.employee_agency.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "qualifications")
public class Qualification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // One of the following would groups would be null
    private String employerId;
    private String companyJobId;
    
    private String professionalUsername;

    private List<String> categories;
    private List<String> keywords;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getEmployerId() {
        return employerId;
    }
    public void setEmployerId(String employerId) {
        this.employerId = employerId;
    }

    public String getCompanyJobId() {
        return companyJobId;
    }
    public void setCompanyJobId(String companyJobId) {
        this.companyJobId = companyJobId;
    }

    public String getProfessionalUsername() {
        return professionalUsername;
    }
    public void setProfessionalUsername(String professionalUsername) {
        this.professionalUsername = professionalUsername;
    }

    public List<String> getCategories() {
        return categories;
    }
    public void setCategories(List<String> categories) {
        this.categories = categories;
    }

    public List<String> getKeywords() {
        return keywords;
    }
    public void setKeywords(List<String> keywords) {
        this.keywords = keywords;
    }
}
