package com.employee_agency.employee_agency.controllers;

import org.springframework.web.bind.annotation.RestController;
import com.employee_agency.employee_agency.entities.NewEmployerRequests;
import com.employee_agency.employee_agency.services.NewEmployerRequestsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/new-employer")
public class NewEmployerRequestsController {

    @Autowired
    private NewEmployerRequestsService newEmployerRequestsService;

    @PostMapping("/register")
    public ResponseEntity<String> registerNewEmployerRequests(@RequestBody NewEmployerRequests newEmployerRequests) {
        boolean success = newEmployerRequestsService.createNewEmployerRequests(newEmployerRequests);
        
        if (success) {
            return ResponseEntity.ok("New Employer Requests registered successfully");
        } else {
            return ResponseEntity.badRequest().body("Username is already in use");
        }        
    }
    
    @PutMapping("/update")
    public ResponseEntity<String> updateNewEmployerRequests(@RequestBody NewEmployerRequests newEmployerRequests) {
        newEmployerRequestsService.updateNewEmployerRequests(newEmployerRequests);
        return ResponseEntity.ok("New Employer Requests updated successfully");
    }

    @DeleteMapping("/approve")
    public ResponseEntity<String> approveNewEmployerRequest(@RequestBody String username) {
        newEmployerRequestsService.approveRequest(username);
        return ResponseEntity.ok("Approved request successfully");
    }
}