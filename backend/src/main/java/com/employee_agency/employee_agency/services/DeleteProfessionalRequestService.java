package com.employee_agency.employee_agency.services;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.EmailService;
import com.employee_agency.employee_agency.entities.DeleteProfessionalRequest;
import com.employee_agency.employee_agency.entities.Professional;
import com.employee_agency.employee_agency.entities.User;
import com.employee_agency.employee_agency.repositories.DeleteProfessionalRequestRepository;
import com.employee_agency.employee_agency.repositories.ProfessionalRepository;
import com.employee_agency.employee_agency.repositories.UserRepository;

@Service
public class DeleteProfessionalRequestService {
    @Autowired
    private DeleteProfessionalRequestRepository deleteProfessionalRequestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfessionalRepository professionalRepository;

    @Autowired
    private EmailService emailService;

    public List<DeleteProfessionalRequest> getAllRequests() {
        List<DeleteProfessionalRequest> allRequests = deleteProfessionalRequestRepository.findAll();

        Collections.reverse(allRequests);

        return allRequests;
    }

    public boolean createRequest(String professionalId) {
        Optional<Professional> professional = professionalRepository.findById(professionalId);
        
        if (professional.isPresent()) {
            DeleteProfessionalRequest request = new DeleteProfessionalRequest();

            request.setProfessionalId(professionalId);
            deleteProfessionalRequestRepository.save(request);

            return true;
        }
        
        return false;
    }

    public void approveRequest(String professionalId) {
        deleteProfessionalRequestRepository.deleteById(professionalId);

        User deletedUser = userRepository.findById(professionalId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        deletedUser.setIsActive(false);
        userRepository.save(deletedUser);

        emailService.sendEmail("mikecamdo@gmail.com", "TalentTitan Deletion Request Approved", "Salutations. After review, your account deletion request for TalentTitan has been approved.\nWe thank you for using our platform and hope to see you again soon!");
    }

    public void denyRequest(String username, String comment) {
        deleteProfessionalRequestRepository.deleteById(username);

        emailService.sendEmail("mikecamdo@gmail.com", "TalentTitan Deletion Request Denied", "Salutations. Unfortunately, after review your account deletion request for TalentTitan has been denied.\nOur staff submitted the following reasoning:\n" + comment + "\nWe invite you to re-request account deletion after all of our staff's concerns have been dealt with.");
    }
}
