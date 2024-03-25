package com.employee_agency.employee_agency.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "job-matchings")
public class JobMatching {
    @Id
    private String professionalUsername;
    // @Id
    private long jobId;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "professional_username")
    // private Professional professional;

    public String getProfessionalUsername() {
        return professionalUsername;
    }

    public void setProfessionalUsername(String professionalUsername) {
        this.professionalUsername = professionalUsername;
    }

    public long getJobId() {
        return jobId;
    }

    public void setJobId(long jobId) {
        this.jobId = jobId;
    }

    // public Professional getProfessional() {
    //     return professional;
    // }
}
