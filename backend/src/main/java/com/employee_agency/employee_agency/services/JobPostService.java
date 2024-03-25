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

    public void updateJobPost(JobPost jobPost) {
        JobPost currentJobPost = jobPostRepository.findById(jobPost.getId())
            .orElseThrow(() -> new RuntimeException("JobPost not found"));

        currentJobPost.setJobName(jobPost.getJobName());
        currentJobPost.setCompanyJobId(jobPost.getCompanyJobId());
        currentJobPost.setContactFirstName(jobPost.getContactFirstName());
        currentJobPost.setContactLastName(jobPost.getContactLastName());
        currentJobPost.setContactPhone(jobPost.getContactPhone());
        currentJobPost.setContactEmail(jobPost.getContactEmail());
        currentJobPost.setStartDate(jobPost.getStartDate());
        currentJobPost.setEndDate(jobPost.getEndDate());
        currentJobPost.setStartTime(jobPost.getStartTime());
        currentJobPost.setEndTime(jobPost.getEndTime());
        currentJobPost.setHourlyRate(jobPost.getHourlyRate());

        jobPostRepository.save(currentJobPost);
    }
}
