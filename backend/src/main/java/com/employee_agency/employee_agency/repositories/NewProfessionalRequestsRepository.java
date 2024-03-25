package com.employee_agency.employee_agency.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.employee_agency.employee_agency.entities.NewProfessionalRequests;

public interface NewProfessionalRequestsRepository extends JpaRepository<NewProfessionalRequests, String> {
    
    NewProfessionalRequests save(NewProfessionalRequests newProfessionalRequests);
}
