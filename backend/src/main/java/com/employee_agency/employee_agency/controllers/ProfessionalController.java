package com.employee_agency.employee_agency.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.employee_agency.employee_agency.dto.ToggleJobMatchingRequest;
import com.employee_agency.employee_agency.dto.UpdateProfessionalDto;
import com.employee_agency.employee_agency.entities.Professional;
import com.employee_agency.employee_agency.services.ProfessionalService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/professionals")
public class ProfessionalController {

    @Autowired
    private ProfessionalService professionalService;

    @GetMapping("/get-all")
    public ResponseEntity<List<Professional>> getAllProfessionals() {
        return ResponseEntity.ok(professionalService.getAllProfessionals());
    }
    
    @GetMapping("/get-by-username")
    public ResponseEntity<Professional> getProfessionalByUsername(@RequestParam String username) {
        Professional professional = professionalService.getProfessionalByUsername(username);

        if (professional == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(professional);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerProfessional(@RequestBody Professional professional) {
        professionalService.createProfessional(professional);
        return ResponseEntity.ok("Professional registered successfully");
    }

    @PutMapping("/update")
    public ResponseEntity<Professional> updateProfessional(@RequestParam String username, @RequestBody UpdateProfessionalDto professional) {
        Professional updatedProfessional = professionalService.updateProfessional(username, professional);

        if (updatedProfessional == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(updatedProfessional);
        }
    }

    @PatchMapping("/toggle-job-matching")
    public ResponseEntity<String> toggleJobMatching(@RequestBody ToggleJobMatchingRequest request) {
        professionalService.toggleJobMatching(request.getProfessionalUsername(), request.getJobMatching());

        if (request.getJobMatching() == true) {
            return ResponseEntity.ok("Started Job Matching");
        } else {
            return ResponseEntity.ok("Ended Job Matching");
        }
    }
}
