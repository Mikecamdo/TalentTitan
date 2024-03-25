package com.employee_agency.employee_agency.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.employee_agency.employee_agency.entities.JobMatchingRequest;

public interface JobMatchingRequestRepository extends JpaRepository<JobMatchingRequest, String> {
    JobMatchingRequest save(JobMatchingRequest jobMatchingRequest);
}
