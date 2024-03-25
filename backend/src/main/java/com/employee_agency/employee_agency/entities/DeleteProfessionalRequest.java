package com.employee_agency.employee_agency.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "delete-professional-requests")
public class DeleteProfessionalRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	private String professionalId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

    public String getProfessionalId() {
		return professionalId;
	}

	public void setProfessionalId(String professionalId) {
		this.professionalId = professionalId;
	}
}
