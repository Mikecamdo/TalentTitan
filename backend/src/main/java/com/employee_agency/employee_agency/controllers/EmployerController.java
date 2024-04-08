package com.employee_agency.employee_agency.controllers;

import org.springframework.web.bind.annotation.RestController;
import com.employee_agency.employee_agency.entities.Employer;
import com.employee_agency.employee_agency.services.EmployerService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/employers")
public class EmployerController {

    @Autowired
    private EmployerService employerService;

    @GetMapping("/get-all")
    public ResponseEntity<List<Employer>> getAllEmployers() {
        return ResponseEntity.ok(employerService.getAllEmployers());
    }

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
