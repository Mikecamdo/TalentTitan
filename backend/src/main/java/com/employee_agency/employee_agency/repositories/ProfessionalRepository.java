package com.employee_agency.employee_agency.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.employee_agency.employee_agency.entities.Professional;

public interface ProfessionalRepository extends JpaRepository<Professional, String> {
    
    Professional save(Professional professional);
}
