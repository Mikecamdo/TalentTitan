package com.employee_agency.employee_agency.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.employee_agency.employee_agency.entities.Qualification;

public interface QualificationRepository extends JpaRepository<Qualification, Long> {

    Qualification save(Qualification qualification);
    Qualification findByEmployerIdAndCompanyJobId(String employerId, String companyJobId);
    Qualification findByProfessionalUsername(String professionalUsername);
}
