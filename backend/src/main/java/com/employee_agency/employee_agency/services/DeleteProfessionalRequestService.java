package com.employee_agency.employee_agency.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.entities.DeleteProfessionalRequest;
import com.employee_agency.employee_agency.entities.User;
import com.employee_agency.employee_agency.repositories.DeleteProfessionalRequestRepository;
import com.employee_agency.employee_agency.repositories.UserRepository;

@Service
public class DeleteProfessionalRequestService {
    @Autowired
    private DeleteProfessionalRequestRepository deleteProfessionalRequestRepository;

    @Autowired
    private UserRepository userRepository;

    public void createRequest(String professionalId) {
        DeleteProfessionalRequest request = new DeleteProfessionalRequest();

        request.setProfessionalId(professionalId);
        deleteProfessionalRequestRepository.save(request);
    }

    public void approveRequest(String professionalId) {
        deleteProfessionalRequestRepository.deleteById(professionalId);

        User deletedUser = userRepository.findById(professionalId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        deletedUser.setIsActive(false);
        userRepository.save(deletedUser);
    }
}
