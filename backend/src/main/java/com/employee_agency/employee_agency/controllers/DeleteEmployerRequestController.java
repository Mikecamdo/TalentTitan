package com.employee_agency.employee_agency.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.employee_agency.employee_agency.services.DeleteEmployerRequestService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/delete-employer")
public class DeleteEmployerRequestController {
    @Autowired
    private DeleteEmployerRequestService deleteEmployerRequestService;

    @PostMapping("/request")
    public ResponseEntity<String> requestDeletion(@RequestBody String employerId) {
        deleteEmployerRequestService.createRequest(employerId);
        
        return ResponseEntity.ok("Employer Deletion Request successful");
    }
    
}
