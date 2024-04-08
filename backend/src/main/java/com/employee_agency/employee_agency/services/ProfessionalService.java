package com.employee_agency.employee_agency.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.entities.Professional;
import com.employee_agency.employee_agency.repositories.ProfessionalRepository;

@Service
public class ProfessionalService {
    
    @Autowired
    private ProfessionalRepository professionalRepository;

    public List<Professional> getAllProfessionals() {
        return professionalRepository.findAll();
    }

    public void createProfessional(Professional professional) {
        professionalRepository.save(professional);
    }

    public void updateProfessional(Professional professional) {
        Professional currentProfessional = professionalRepository.findById(professional.getUsername())
            .orElseThrow(() -> new RuntimeException("Professional not found"));

        currentProfessional.setPhone(professional.getPhone());
        currentProfessional.setEmail(professional.getEmail());
        currentProfessional.setAddressLine(professional.getAddressLine());
        currentProfessional.setCity(professional.getCity());
        currentProfessional.setState(professional.getState());
        currentProfessional.setZipCode(professional.getZipCode());
        currentProfessional.setSchoolName(professional.getSchoolName());
        currentProfessional.setDegreeName(professional.getDegreeName());
        currentProfessional.setCompletionDate(professional.getCompletionDate());

        professionalRepository.save(currentProfessional);
    }

    public void toggleJobMatching(String professionalUsername, Boolean jobMatching) {
        Professional currentProfessional = professionalRepository.findById(professionalUsername)
            .orElseThrow(() -> new RuntimeException("Professional not found"));

        currentProfessional.setJobMatching(jobMatching);

        professionalRepository.save(currentProfessional);
    }
}
