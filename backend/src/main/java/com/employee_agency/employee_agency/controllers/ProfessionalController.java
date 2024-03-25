package com.employee_agency.employee_agency.controllers;

import org.springframework.web.bind.annotation.RestController;
import com.employee_agency.employee_agency.entities.Professional;
import com.employee_agency.employee_agency.services.ProfessionalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/professionals")
public class ProfessionalController {

    @Autowired
    private ProfessionalService professionalService;

    @PostMapping("/register")
    public ResponseEntity<String> registerProfessional(@RequestBody Professional professional) {
        professionalService.createProfessional(professional);
        return ResponseEntity.ok("Professional registered successfully");
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateProfessional(@RequestBody Professional professional) {
        professionalService.updateProfessional(professional);
        return ResponseEntity.ok("Professional updated successfully");
    }
}
