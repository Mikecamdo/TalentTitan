package com.employee_agency.employee_agency.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.entities.NewEmployerRequests;
import com.employee_agency.employee_agency.entities.Professional;
import com.employee_agency.employee_agency.repositories.NewEmployerRequestsRepository;

@Service
public class NewEmployerRequestsService {
    
    @Autowired
    private NewEmployerRequestsRepository newEmployerRequestsRepository;

    public void createNewEmployerRequests(NewEmployerRequests newEmployerRequests) {
        newEmployerRequestsRepository.save(newEmployerRequests);
    }

    public void updateNewEmployerRequests(NewEmployerRequests newEmployerRequests) {
        NewEmployerRequests currentNewEmployerRequests = newEmployerRequestsRepository.findById(newEmployerRequests.getUsername())
            .orElseThrow(() -> new RuntimeException("Employer Requests not found"));

        currentNewEmployerRequests.setAddressLine(newEmployerRequests.getAddressLine());
        currentNewEmployerRequests.setCity(newEmployerRequests.getCity());
        currentNewEmployerRequests.setState(newEmployerRequests.getState());
        currentNewEmployerRequests.setZipCode(newEmployerRequests.getZipCode());
        currentNewEmployerRequests.setContactFirstName(newEmployerRequests.getContactFirstName());
        currentNewEmployerRequests.setContactLastName(newEmployerRequests.getContactLastName());
        currentNewEmployerRequests.setContactPhone(newEmployerRequests.getContactPhone());
        currentNewEmployerRequests.setContactEmail(newEmployerRequests.getContactEmail());

        newEmployerRequestsRepository.save(currentNewEmployerRequests);
    }
}
