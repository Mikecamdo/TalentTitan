package com.employee_agency.employee_agency.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.entities.JobPost;
import com.employee_agency.employee_agency.entities.NewProfessionalRequests;
import com.employee_agency.employee_agency.entities.Professional;
import com.employee_agency.employee_agency.entities.Qualification;
import com.employee_agency.employee_agency.repositories.JobPostRepository;
import com.employee_agency.employee_agency.repositories.NewProfessionalRequestsRepository;
import com.employee_agency.employee_agency.repositories.ProfessionalRepository;
import com.employee_agency.employee_agency.repositories.QualificationRepository;

@Service
public class QualificationService {
    @Autowired
    private QualificationRepository qualificationRepository;

    @Autowired
    private ProfessionalRepository professionalRepository;

    @Autowired
    private NewProfessionalRequestsRepository newProfessionalRequestsRepository;

    @Autowired
    private JobPostRepository jobPostRepository;

    public Qualification getJobQualifications(String employerId, String companyJobId) {
        return qualificationRepository.findByEmployerIdAndCompanyJobId(employerId, companyJobId);
    }

    public Qualification getProfessionalQualifications(String professionalUsername) {
        return qualificationRepository.findByProfessionalUsername(professionalUsername);
    }

    public boolean addQualifications(Qualification qualifications) {
        if (qualifications.getProfessionalUsername() != null) {
            Optional<Professional> professional = professionalRepository
                    .findById(qualifications.getProfessionalUsername());

            if (professional.isPresent()) {
                qualificationRepository.save(qualifications);
                return true;
            }

            Optional<NewProfessionalRequests> professionalRequest = newProfessionalRequestsRepository.findById(qualifications.getProfessionalUsername());

            if (professionalRequest.isPresent()) {
                qualificationRepository.save(qualifications);
                return true;
            }
        } else {
            JobPost jobPost = jobPostRepository.findByEmployerIdAndCompanyJobId(qualifications.getEmployerId(),
                    qualifications.getCompanyJobId());

            if (jobPost != null) {
                qualificationRepository.save(qualifications);
                return true;
            }
        }

        return false;
    }

    public boolean updateQualifications(Qualification qualifications) {
        if (qualifications.getEmployerId() == null) {
            Qualification currentQualifications = qualificationRepository
                    .findByProfessionalUsername(qualifications.getProfessionalUsername());

            if (currentQualifications != null) {
                currentQualifications.setCategories(qualifications.getCategories());
                currentQualifications.setKeywords(qualifications.getKeywords());

                qualificationRepository.save(currentQualifications);
                return true;
            }
        } else {
            Qualification currentQualifications = qualificationRepository
                    .findByEmployerIdAndCompanyJobId(qualifications.getEmployerId(), qualifications.getCompanyJobId());

            if (currentQualifications != null) {
                currentQualifications.setCategories(qualifications.getCategories());
                currentQualifications.setKeywords(qualifications.getKeywords());

                qualificationRepository.save(currentQualifications);
                return true;
            }
        }

        return false;
    }
}
