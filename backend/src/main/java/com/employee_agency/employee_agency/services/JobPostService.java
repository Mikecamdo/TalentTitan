package com.employee_agency.employee_agency.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.entities.JobPost;
import com.employee_agency.employee_agency.repositories.JobPostRepository;

@Service
public class JobPostService {
    @Autowired
    private JobPostRepository jobPostRepository;

    public void addJobPost(JobPost jobPost) {
        jobPostRepository.save(jobPost);
    }
}
