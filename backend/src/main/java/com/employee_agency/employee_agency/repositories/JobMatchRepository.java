package com.employee_agency.employee_agency.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.employee_agency.employee_agency.entities.JobMatch;

public interface JobMatchRepository extends JpaRepository<JobMatch, Long> {
    JobMatch save(JobMatch jobMatch);
    List<JobMatch> findAllByProfessionalUsername(String professionalUsername);
}
