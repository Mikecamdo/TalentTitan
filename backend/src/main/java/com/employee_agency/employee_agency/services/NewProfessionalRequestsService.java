package com.employee_agency.employee_agency.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.entities.NewProfessionalRequests;
import com.employee_agency.employee_agency.repositories.NewProfessionalRequestsRepository;

@Service
public class NewProfessionalRequestsService {
    
    @Autowired
    private NewProfessionalRequestsRepository newProfessionalRequestsRepository;

    public void createNewProfessionalRequests(NewProfessionalRequests newProfessionalRequests) {
        newProfessionalRequestsRepository.save(newProfessionalRequests);
    }

    public void updateNewProfessionalRequests(NewProfessionalRequests newProfessionalRequests) {
        NewProfessionalRequests currentNewProfessionalRequests = newProfessionalRequestsRepository.findById(newProfessionalRequests.getUsername())
            .orElseThrow(() -> new RuntimeException("Professional Request not found"));

        currentNewProfessionalRequests.setPhone(newProfessionalRequests.getPhone());
        currentNewProfessionalRequests.setEmail(newProfessionalRequests.getEmail());
        currentNewProfessionalRequests.setAddressLine(newProfessionalRequests.getAddressLine());
        currentNewProfessionalRequests.setCity(newProfessionalRequests.getCity());
        currentNewProfessionalRequests.setState(newProfessionalRequests.getState());
        currentNewProfessionalRequests.setZipCode(newProfessionalRequests.getZipCode());
        currentNewProfessionalRequests.setSchoolName(newProfessionalRequests.getSchoolName());
        currentNewProfessionalRequests.setDegreeName(newProfessionalRequests.getDegreeName());
        currentNewProfessionalRequests.setCompletionDate(newProfessionalRequests.getCompletionDate());

        newProfessionalRequestsRepository.save(currentNewProfessionalRequests);
    }
}
