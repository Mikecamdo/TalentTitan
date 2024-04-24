package com.employee_agency.employee_agency.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.EmailService;
import com.employee_agency.employee_agency.entities.DeleteEmployerRequest;
import com.employee_agency.employee_agency.entities.Employer;
import com.employee_agency.employee_agency.entities.User;
import com.employee_agency.employee_agency.repositories.DeleteEmployerRequestRepository;
import com.employee_agency.employee_agency.repositories.EmployerRepository;
import com.employee_agency.employee_agency.repositories.UserRepository;

@Service
public class DeleteEmployerRequestService {
    @Autowired
    private DeleteEmployerRequestRepository deleteEmployerRequestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployerRepository employerRepository;

    @Autowired
    private EmailService emailService;

    public List<DeleteEmployerRequest> getAllRequests() {
        return deleteEmployerRequestRepository.findAll();
    }

    public boolean createRequest(String employerId) {
        Optional<Employer> employer = employerRepository.findById(employerId);

        if (employer.isPresent()) {
            DeleteEmployerRequest request = new DeleteEmployerRequest();

            request.setEmployerId(employerId);
            deleteEmployerRequestRepository.save(request);

            return true;
        }

        return false;
    }

    public void approveRequest(String employerId) {
        deleteEmployerRequestRepository.deleteById(employerId);

        User deletedUser = userRepository.findById(employerId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        deletedUser.setIsActive(false);
        userRepository.save(deletedUser);

        emailService.sendEmail("mikecamdo@gmail.com", "TalentTitan Deletion Request Approved", "Salutations. After review, your account deletion request for TalentTitan has been approved.\nWe thank you for using our platform and hope to see you again soon!");
    }

    public void denyRequest(String username, String comment) {
        deleteEmployerRequestRepository.deleteById(username);
        
        emailService.sendEmail("mikecamdo@gmail.com", "TalentTitan Deletion Request Denied", "Salutations. Unfortunately, after review your account deletion request for TalentTitan has been denied.\nOur staff submitted the following reasoning:\n" + comment + "\nWe invite you to re-request account deletion after all of our staff's concerns have been dealt with.");
    }
}
