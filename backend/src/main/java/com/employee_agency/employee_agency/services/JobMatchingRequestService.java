package com.employee_agency.employee_agency.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.entities.JobMatchingRequest;
import com.employee_agency.employee_agency.entities.Professional;
import com.employee_agency.employee_agency.repositories.JobMatchingRequestRepository;
import com.employee_agency.employee_agency.repositories.ProfessionalRepository;

@Service
public class JobMatchingRequestService {
    @Autowired
    private JobMatchingRequestRepository jobMatchingRequestRepository;

    @Autowired
    private ProfessionalRepository professionalRepository;

    public void createRequest(String professionalUsername) {
        JobMatchingRequest newRequest = new JobMatchingRequest();
        newRequest.setProfessionalUsername(professionalUsername);

        jobMatchingRequestRepository.save(newRequest);
    }

    public void approveRequest(String professionalUsername) {
        jobMatchingRequestRepository.deleteById(professionalUsername);

        Professional currentProfessional = professionalRepository.findById(professionalUsername)
            .orElseThrow(() -> new RuntimeException("Professional not found"));

        currentProfessional.setJobMatching(true);
        professionalRepository.save(currentProfessional);

        //TODO: Here we would initiate the matching algorithm (?)
    }
}
