package com.employee_agency.employee_agency.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.employee_agency.employee_agency.entities.DeleteProfessionalRequest;

public interface DeleteProfessionalRequestRepository extends JpaRepository<DeleteProfessionalRequest, String> {
    DeleteProfessionalRequest save(DeleteProfessionalRequest deleteProfessionalRequest);
}
