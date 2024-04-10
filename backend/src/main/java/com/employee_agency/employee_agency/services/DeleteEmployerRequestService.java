package com.employee_agency.employee_agency.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    }
}
