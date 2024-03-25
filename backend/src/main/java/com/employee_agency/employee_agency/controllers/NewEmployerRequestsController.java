package com.employee_agency.employee_agency.controllers;

import org.springframework.web.bind.annotation.RestController;
import com.employee_agency.employee_agency.entities.NewEmployerRequests;
import com.employee_agency.employee_agency.services.NewEmployerRequestsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/newEmployerRequests")
public class NewEmployerRequestsController {

    @Autowired
    private NewEmployerRequestsService newEmployerRequestsService;

    @PostMapping("/register")
    public ResponseEntity<String> registerNewEmployerRequests(@RequestBody NewEmployerRequests newEmployerRequests) {
        newEmployerRequestsService.createNewEmployerRequests(newEmployerRequests);
        return ResponseEntity.ok("New Employer Requests registered successfully");
    }
    
    @PutMapping("/update")
    public ResponseEntity<String> updateNewEmployerRequests(@RequestBody NewEmployerRequests newEmployerRequests) {
        newEmployerRequestsService.updateNewEmployerRequests(newEmployerRequests);
        return ResponseEntity.ok("New Employer Requests updated successfully");
    }
}
