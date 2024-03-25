package com.employee_agency.employee_agency.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.employee_agency.employee_agency.entities.Employer;

public interface EmployerRepository extends JpaRepository<Employer, String> {
    Employer save(Employer employer);
}
