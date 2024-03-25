package com.employee_agency.employee_agency.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.entities.Professional;
import com.employee_agency.employee_agency.repositories.ProfessionalRepository;

@Service
public class ProfessionalService {
    
    @Autowired
    private ProfessionalRepository professionalRepository;

    public void createProfessional(Professional professional) {
        professionalRepository.save(professional);
    }
}
