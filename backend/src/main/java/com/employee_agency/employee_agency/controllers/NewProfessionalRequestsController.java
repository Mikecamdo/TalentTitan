package com.employee_agency.employee_agency.controllers;

import org.springframework.web.bind.annotation.RestController;
import com.employee_agency.employee_agency.entities.NewProfessionalRequests;
import com.employee_agency.employee_agency.services.NewProfessionalRequestsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/newProfessionalRequests")
public class NewProfessionalRequestsController {

    @Autowired
    private NewProfessionalRequestsService newProfessionalRequestsService;

    @PostMapping("/register")
    public ResponseEntity<String> registerNewProfessionalRequests(@RequestBody NewProfessionalRequests newProfessionalRequests) {
        newProfessionalRequestsService.createNewProfessionalRequests(newProfessionalRequests);
        return ResponseEntity.ok("New Professional Request registered successfully");
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateNewProfessionalRequests(@RequestBody NewProfessionalRequests newProfessionalRequests) {
        newProfessionalRequestsService.updateNewProfessionalRequests(newProfessionalRequests);
        return ResponseEntity.ok("New Professional Account updated successfully");
    }
}
