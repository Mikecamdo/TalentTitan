package com.employee_agency.employee_agency.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employee_agency.employee_agency.services.DeleteProfessionalRequestService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/delete-professional")
public class DeleteProfessionalRequestController {
    @Autowired
    private DeleteProfessionalRequestService deleteProfessionalRequestService;

    @PostMapping("/request")
    public ResponseEntity<String> requestDeletion(@RequestBody String professionalId) {
        deleteProfessionalRequestService.createRequest(professionalId);
        
        return ResponseEntity.ok("Professional Deletion Request successful");
    }
    
    @DeleteMapping("/approve")
    public ResponseEntity<String> approveDeletionRequest(@RequestBody String professionalId) {
        deleteProfessionalRequestService.approveRequest(professionalId);
        return ResponseEntity.ok("Professional successfully deleted");
    }
}
