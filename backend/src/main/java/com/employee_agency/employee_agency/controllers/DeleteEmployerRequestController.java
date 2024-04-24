package com.employee_agency.employee_agency.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.employee_agency.employee_agency.entities.DeleteEmployerRequest;
import com.employee_agency.employee_agency.services.DeleteEmployerRequestService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/delete-employer")
public class DeleteEmployerRequestController {
    @Autowired
    private DeleteEmployerRequestService deleteEmployerRequestService;

    @GetMapping("/get-all")
    public ResponseEntity<List<DeleteEmployerRequest>> getAllRequests() {
        return ResponseEntity.ok(deleteEmployerRequestService.getAllRequests());
    }

    @PostMapping("/request")
    public ResponseEntity<String> requestDeletion(@RequestParam String employerId) {
        boolean success = deleteEmployerRequestService.createRequest(employerId);
        
        if (success) {
            return ResponseEntity.ok("Employer Deletion Request successful");
        } else {
            return ResponseEntity.badRequest().body("No Employer exists with the username " + employerId);
        }
    }
    
    @DeleteMapping("/approve")
    public ResponseEntity<String> approveDeletionRequest(@RequestParam String employerId) {
        deleteEmployerRequestService.approveRequest(employerId);
        return ResponseEntity.ok("Employer successfully deleted");
    }
}
