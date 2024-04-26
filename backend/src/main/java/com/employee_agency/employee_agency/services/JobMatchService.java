package com.employee_agency.employee_agency.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.entities.JobMatch;
import com.employee_agency.employee_agency.repositories.JobMatchRepository;

@Service
public class JobMatchService {
    @Autowired
    private JobMatchRepository jobMatchRepository;

    public List<JobMatch> getUserJobMatches(String username) {
        return jobMatchRepository.findAllByProfessionalUsername(username);
    }

    public void addJobMatch(String professionalUsername, Long jobId) {
        JobMatch jobMatch = new JobMatch();

        jobMatch.setProfessionalUsername(professionalUsername);
        jobMatch.setJobId(jobId);
        
        jobMatchRepository.save(jobMatch);
    }
}
