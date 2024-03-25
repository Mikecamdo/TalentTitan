package com.employee_agency.employee_agency.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "job-matching-requests")
public class JobMatchingRequest {
    @Id
    private String professionalUsername;

	public String getProfessionalUsername() {
		return professionalUsername;
	}

	public void setProfessionalUsername(String professionalUsername) {
		this.professionalUsername = professionalUsername;
	}
}
