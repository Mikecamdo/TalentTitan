package com.employee_agency.employee_agency.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.dto.UpdateProfessionalDto;
import com.employee_agency.employee_agency.entities.Professional;
import com.employee_agency.employee_agency.repositories.ProfessionalRepository;

@Service
public class ProfessionalService {
    
    @Autowired
    private ProfessionalRepository professionalRepository;

    public List<Professional> getAllProfessionals() {
        return professionalRepository.findAll();
    }

    public Professional getProfessionalByUsername(String username) {
        Optional<Professional> professional = professionalRepository.findById(username);
        
        if (professional.isPresent()) {
            return professional.get();
        }

        return null;
    }

    public void createProfessional(Professional professional) {
        professionalRepository.save(professional);
    }

    public Professional updateProfessional(String username, UpdateProfessionalDto professional) {
        Optional<Professional> currentProfessional = professionalRepository.findById(username);

        if (currentProfessional.isPresent()) {
            Professional toBeUpdated = currentProfessional.get();

            toBeUpdated.setPhone(professional.getPhone());
            toBeUpdated.setEmail(professional.getEmail());
            toBeUpdated.setAddressLine(professional.getAddressLine());
            toBeUpdated.setCity(professional.getCity());
            toBeUpdated.setState(professional.getState());
            toBeUpdated.setZipCode(professional.getZipCode());
            toBeUpdated.setSchoolName(professional.getSchoolName());
            toBeUpdated.setDegreeName(professional.getDegreeName());
            toBeUpdated.setCompletionDate(professional.getCompletionDate());

            professionalRepository.save(toBeUpdated);

            return toBeUpdated;
        }

        return null;
    }

    public void toggleJobMatching(String professionalUsername, Boolean jobMatching) {
        Professional currentProfessional = professionalRepository.findById(professionalUsername)
            .orElseThrow(() -> new RuntimeException("Professional not found"));

        currentProfessional.setJobMatching(jobMatching);

        professionalRepository.save(currentProfessional);
    }
}
