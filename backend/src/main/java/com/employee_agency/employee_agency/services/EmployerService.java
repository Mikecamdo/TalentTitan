package com.employee_agency.employee_agency.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.entities.Employer;
import com.employee_agency.employee_agency.entities.Professional;
import com.employee_agency.employee_agency.repositories.EmployerRepository;

@Service
public class EmployerService {
    
    @Autowired
    private EmployerRepository employerRepository;

    public void createEmployer(Employer employer) {
        employerRepository.save(employer);
    }

    public void updateEmployer(Employer employer) {
        Employer currentEmployer = employerRepository.findById(employer.getUsername())
            .orElseThrow(() -> new RuntimeException("Employer not found"));

        currentEmployer.setAddressLine(employer.getAddressLine());
        currentEmployer.setCity(employer.getCity());
        currentEmployer.setState(employer.getState());
        currentEmployer.setZipCode(employer.getZipCode());
        currentEmployer.setContactFirstName(employer.getContactFirstName());
        currentEmployer.setContactLastName(employer.getContactLastName());
        currentEmployer.setContactPhone(employer.getContactPhone());
        currentEmployer.setContactEmail(employer.getContactEmail());

        employerRepository.save(currentEmployer);
    }
}
