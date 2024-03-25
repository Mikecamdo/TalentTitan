package com.employee_agency.employee_agency.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.entities.Employer;
import com.employee_agency.employee_agency.repositories.EmployerRepository;

@Service
public class EmployerService {
    
    @Autowired
    private EmployerRepository employerRepository;

    public void createEmployer(Employer employer) {
        employerRepository.save(employer);
    }
}
