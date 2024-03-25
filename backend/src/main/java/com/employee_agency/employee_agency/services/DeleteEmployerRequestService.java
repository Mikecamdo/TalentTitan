package com.employee_agency.employee_agency.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.entities.DeleteEmployerRequest;
import com.employee_agency.employee_agency.entities.NewProfessionalRequests;
import com.employee_agency.employee_agency.entities.User;
import com.employee_agency.employee_agency.repositories.DeleteEmployerRequestRepository;
import com.employee_agency.employee_agency.repositories.UserRepository;

@Service
public class DeleteEmployerRequestService {
    @Autowired
    private DeleteEmployerRequestRepository deleteEmployerRequestRepository;

    @Autowired
    private UserRepository userRepository;

    public void createRequest(String employerId) {
        DeleteEmployerRequest request = new DeleteEmployerRequest();

        request.setEmployerId(employerId);
        deleteEmployerRequestRepository.save(request);
    }

    public void approveRequest(String employerId) {
        deleteEmployerRequestRepository.deleteById(employerId);

        User deletedUser = userRepository.findById(employerId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        deletedUser.setIsActive(false);
        userRepository.save(deletedUser);
    }
}
