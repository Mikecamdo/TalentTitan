package com.employee_agency.employee_agency.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.dto.UpdateEmployerDto;
import com.employee_agency.employee_agency.entities.Employer;
import com.employee_agency.employee_agency.repositories.EmployerRepository;

@Service
public class EmployerService {
    
    @Autowired
    private EmployerRepository employerRepository;

    public List<Employer> getAllEmployers() {
        return employerRepository.findAll();
    }

    public Employer getEmployerByUsername(String username) {
        Optional<Employer> employer = employerRepository.findById(username);

        if (employer.isPresent()) {
            return employer.get();
        }

        return null;
    }

    public void createEmployer(Employer employer) {
        employerRepository.save(employer);
    }

    public Employer updateEmployer(String username, UpdateEmployerDto employer) {
        Optional<Employer> currentEmployer = employerRepository.findById(username);

        if (currentEmployer.isPresent()) {
            Employer toBeUpdated = currentEmployer.get();

            toBeUpdated.setAddressLine(employer.getAddressLine());
            toBeUpdated.setCity(employer.getCity());
            toBeUpdated.setState(employer.getState());
            toBeUpdated.setZipCode(employer.getZipCode());
            toBeUpdated.setContactFirstName(employer.getContactFirstName());
            toBeUpdated.setContactLastName(employer.getContactLastName());
            toBeUpdated.setContactPhone(employer.getContactPhone());
            toBeUpdated.setContactEmail(employer.getContactEmail());

            employerRepository.save(toBeUpdated);

            return toBeUpdated;
        }

        return null;        
    }
}
