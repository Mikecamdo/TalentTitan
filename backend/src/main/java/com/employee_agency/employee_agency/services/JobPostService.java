package com.employee_agency.employee_agency.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.entities.JobPost;
import com.employee_agency.employee_agency.repositories.JobPostRepository;

@Service
public class JobPostService {
    @Autowired
    private JobPostRepository jobPostRepository;

    public List<JobPost> getJobsByCompany(String employerUsername) {
        return jobPostRepository.findAllByEmployerId(employerUsername);
    }

    public boolean addJobPost(JobPost jobPost) {
        JobPost existingJob = jobPostRepository.findByEmployerIdAndCompanyJobId(jobPost.getEmployerId(), jobPost.getCompanyJobId());

        if (existingJob == null) {
            jobPostRepository.save(jobPost);
            return true;
        }

        return false;
        
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
