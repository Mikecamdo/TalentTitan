package com.employee_agency.employee_agency.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.employee_agency.employee_agency.entities.DeleteEmployerRequest;

public interface DeleteEmployerRequestRepository extends JpaRepository<DeleteEmployerRequest, String> {
    DeleteEmployerRequest save(DeleteEmployerRequest deleteEmployerRequest);
}
