package com.employee_agency.employee_agency.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.employee_agency.employee_agency.entities.JobPost;

public interface JobPostRepository extends JpaRepository<JobPost, Long> {
    JobPost save(JobPost jobPost);
    List<JobPost> findAllByEmployerId(String employerId);
    JobPost findByEmployerIdAndCompanyJobId(String employerId, String companyJobId);
}
