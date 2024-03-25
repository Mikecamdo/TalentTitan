package com.employee_agency.employee_agency.controllers;

import org.springframework.web.bind.annotation.RestController;
import com.employee_agency.employee_agency.entities.Employer;
import com.employee_agency.employee_agency.services.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/employers")
public class EmployerController {

    @Autowired
    private EmployerService employerService;

    @PostMapping("/register")
    public ResponseEntity<String> registerEmployer(@RequestBody Employer employer) {
        employerService.createEmployer(employer);
        return ResponseEntity.ok("Employer registered successfully");
    }
    
    @PutMapping("/update")
    public ResponseEntity<String> updateEmployer(@RequestBody Employer employer) {
        employerService.updateEmployer(employer);
        return ResponseEntity.ok("Employer updated successfully");
    }
}
