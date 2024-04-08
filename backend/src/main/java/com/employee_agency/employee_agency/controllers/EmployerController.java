package com.employee_agency.employee_agency.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.employee_agency.employee_agency.dto.UpdateEmployerDto;
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
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/employers")
public class EmployerController {

    @Autowired
    private EmployerService employerService;

    @GetMapping("/get-all")
    public ResponseEntity<List<Employer>> getAllEmployers() {
        return ResponseEntity.ok(employerService.getAllEmployers());
    }

    @GetMapping("/get-by-username")
    public ResponseEntity<Employer> getEmployerByUsername(@RequestParam String username) {
        Employer employer = employerService.getEmployerByUsername(username);

        if (employer == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(employer);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerEmployer(@RequestBody Employer employer) {
        employerService.createEmployer(employer);
        return ResponseEntity.ok("Employer registered successfully");
    }
    
    @PutMapping("/update")
    public ResponseEntity<Employer> updateEmployer(@RequestParam String username, @RequestBody UpdateEmployerDto employer) {
        Employer updatedEmployer = employerService.updateEmployer(username, employer);
        
        if (updatedEmployer == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(updatedEmployer);
        }
    }
}
