package com.employee_agency.employee_agency.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employee_agency.employee_agency.entities.DeleteProfessionalRequest;
import com.employee_agency.employee_agency.services.DeleteProfessionalRequestService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/delete-professional")
public class DeleteProfessionalRequestController {
    @Autowired
    private DeleteProfessionalRequestService deleteProfessionalRequestService;

    @GetMapping("/get-all")
    public ResponseEntity<List<DeleteProfessionalRequest>> getAllRequests() {
        return ResponseEntity.ok(deleteProfessionalRequestService.getAllRequests());
    }
    
    @PostMapping("/request")
    public ResponseEntity<String> requestDeletion(@RequestBody String professionalId) {
        boolean success = deleteProfessionalRequestService.createRequest(professionalId);
        
        if (success) {
            return ResponseEntity.ok("Professional Deletion Request successful");
        } else {
            return ResponseEntity.badRequest().body("No Professional exists with the username " + professionalId);
        }        
    }
    
    @DeleteMapping("/approve")
    public ResponseEntity<String> approveDeletionRequest(@RequestBody String professionalId) {
        deleteProfessionalRequestService.approveRequest(professionalId);
        return ResponseEntity.ok("Professional successfully deleted");
    }
}
