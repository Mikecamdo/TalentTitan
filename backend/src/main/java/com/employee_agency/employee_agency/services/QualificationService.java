package com.employee_agency.employee_agency.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.entities.JobPost;
import com.employee_agency.employee_agency.entities.Professional;
import com.employee_agency.employee_agency.entities.Qualification;
import com.employee_agency.employee_agency.repositories.JobPostRepository;
import com.employee_agency.employee_agency.repositories.ProfessionalRepository;
import com.employee_agency.employee_agency.repositories.QualificationRepository;

@Service
public class QualificationService {
    @Autowired
    private QualificationRepository qualificationRepository;

    @Autowired
    private ProfessionalRepository professionalRepository;

    @Autowired
    private JobPostRepository jobPostRepository;

    public Qualification getJobQualifications(Long jobId) {
        return qualificationRepository.findByJobPostId(jobId);
    }

    public Qualification getProfessionalQualifications(String professionalUsername) {
        return qualificationRepository.findByProfessionalUsername(professionalUsername);
    }

    public boolean addQualifications(Qualification qualifications) {
        if (qualifications.getJobPostId() == null) {
            Optional<Professional> professional = professionalRepository.findById(qualifications.getProfessionalUsername());

            if (professional.isPresent()) {
                qualificationRepository.save(qualifications);
                return true;
            }
        } else {
            Optional<JobPost> jobPost = jobPostRepository.findById(qualifications.getJobPostId());

            if (jobPost.isPresent()) {
                qualificationRepository.save(qualifications);
                return true;
            }
        }

        return false;
    }

    public boolean updateQualifications(Qualification qualifications) {
        if (qualifications.getJobPostId() == null) {
            Optional<Professional> professional = professionalRepository.findById(qualifications.getProfessionalUsername());

            if (professional.isPresent()) {
                qualificationRepository.save(qualifications);
                return true;
            }
        } else {
            Optional<JobPost> jobPost = jobPostRepository.findById(qualifications.getJobPostId());

            if (jobPost.isPresent()) {
                qualificationRepository.save(qualifications);
                return true;
            }
        }

        return false;
    }
}
