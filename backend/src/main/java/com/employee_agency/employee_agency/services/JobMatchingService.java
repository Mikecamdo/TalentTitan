package com.employee_agency.employee_agency.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.entities.JobMatching;
import com.employee_agency.employee_agency.repositories.JobMatchingRepository;

@Service
public class JobMatchingService {
    @Autowired
    private JobMatchingRepository jobMatchingRepository;

    public void addJobMatching(String professionalUsername, Long jobId) {
        JobMatching jobMatch = new JobMatching();
        jobMatch.setProfessionalUsername(professionalUsername);
        jobMatch.setJobId(jobId);
        
        jobMatchingRepository.save(jobMatch);
    }
}
