package com.employee_agency.employee_agency.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.entities.DeleteEmployerRequest;
import com.employee_agency.employee_agency.repositories.DeleteEmployerRequestRepository;

@Service
public class DeleteEmployerRequestService {
    @Autowired
    private DeleteEmployerRequestRepository deleteEmployerRequestRepository;

    public void createRequest(String employerId) {
        DeleteEmployerRequest request = new DeleteEmployerRequest();

        request.setEmployerId(employerId);
        deleteEmployerRequestRepository.save(request);
    }
}
