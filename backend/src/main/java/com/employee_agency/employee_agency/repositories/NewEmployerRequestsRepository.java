package com.employee_agency.employee_agency.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.employee_agency.employee_agency.entities.NewEmployerRequests;

public interface NewEmployerRequestsRepository extends JpaRepository<NewEmployerRequests, String> {
    NewEmployerRequests save(NewEmployerRequests newEmployerRequests);
}
