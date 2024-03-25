package com.employee_agency.employee_agency.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.entities.DeleteProfessionalRequest;
import com.employee_agency.employee_agency.repositories.DeleteProfessionalRequestRepository;

@Service
public class DeleteProfessionalRequestService {
    @Autowired
    private DeleteProfessionalRequestRepository deleteProfessionalRequestRepository;

    public void createRequest(String professionalId) {
        DeleteProfessionalRequest request = new DeleteProfessionalRequest();

        request.setProfessionalId(professionalId);
        deleteProfessionalRequestRepository.save(request);
    }
}
