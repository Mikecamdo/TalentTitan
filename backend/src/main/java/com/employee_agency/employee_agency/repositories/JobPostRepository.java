package com.employee_agency.employee_agency.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.employee_agency.employee_agency.entities.JobPost;

public interface JobPostRepository extends JpaRepository<JobPost, String> {
    JobPost save(JobPost jobPost);
}
