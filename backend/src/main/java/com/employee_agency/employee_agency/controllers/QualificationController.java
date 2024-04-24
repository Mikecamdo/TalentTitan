package com.employee_agency.employee_agency.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.employee_agency.employee_agency.entities.Qualification;
import com.employee_agency.employee_agency.services.QualificationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/qualifications")
public class QualificationController {
    @Autowired
    private QualificationService qualificationService;

    @GetMapping("/get-by-job")
    public ResponseEntity<?> getJobQualifications(@RequestParam String employerId, @RequestParam String companyJobId) {
        Qualification qualifications = qualificationService.getJobQualifications(employerId, companyJobId);

        if (qualifications == null) {
            return ResponseEntity.badRequest().body("No qualifications exists for Job Id " + companyJobId);
        } else {
            return ResponseEntity.ok(qualifications);
        }
    }

    @GetMapping("/get-by-professional")
    public ResponseEntity<?> getProfessionalQualifications(@RequestParam String username) {
        Qualification qualifications = qualificationService.getProfessionalQualifications(username);

        if (qualifications == null) {
            return ResponseEntity.badRequest().body("No qualifications exists for Professional " + username);
        } else {
            return ResponseEntity.ok(qualifications);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addQualifications(@RequestBody Qualification qualifications) {        
        boolean success = qualificationService.addQualifications(qualifications);

        if (success) {
            return ResponseEntity.ok("Successfully added qualifications");
        } else {
            if (qualifications.getEmployerId() == null) {
                return ResponseEntity.badRequest().body("No Professional exists with username " + qualifications.getProfessionalUsername());
            } else {
                return ResponseEntity.badRequest().body("No Job Post exists with id " + qualifications.getCompanyJobId());
            }
        }
    }
    
    @PutMapping("/update")
    public ResponseEntity<String> updateQualifications(@RequestBody Qualification qualifications) {        
        boolean success = qualificationService.updateQualifications(qualifications);

        if (success) {
            return ResponseEntity.ok("Successfully updated qualifications");
        } else {
            if (qualifications.getEmployerId() == null) {
                return ResponseEntity.badRequest().body("No Professional exists with username " + qualifications.getProfessionalUsername());
            } else {
                return ResponseEntity.badRequest().body("No Job Post exists with id " + qualifications.getCompanyJobId());
            }
        }
    }
}
