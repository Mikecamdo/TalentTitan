package com.employee_agency.employee_agency.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.employee_agency.employee_agency.entities.Qualification;
import com.employee_agency.employee_agency.services.QualificationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;





@RestController
@RequestMapping("/qualifications")
public class QualificationController {
    @Autowired
    private QualificationService qualificationService;

    @GetMapping("/get-by-job")
    public ResponseEntity<?> getJobQualifications(@RequestParam Long id) {
        Qualification qualifications = qualificationService.getJobQualifications(id);

        if (qualifications == null) {
            return ResponseEntity.badRequest().body("No qualifications exists for Job Id " + id);
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
        if (qualifications.getJobPostId() != null && qualifications.getProfessionalUsername() != null) {
            return ResponseEntity.badRequest().body("Qualifications cannot have both a JobPostId and a ProfessionalUsername");
        }
        
        boolean success = qualificationService.addQualifications(qualifications);

        if (success) {
            return ResponseEntity.ok("Successfully added qualifications");
        } else {
            if (qualifications.getJobPostId() == null) {
                return ResponseEntity.badRequest().body("No Professional exists with username " + qualifications.getProfessionalUsername());
            } else {
                return ResponseEntity.badRequest().body("No Job Post exists with id " + qualifications.getJobPostId());
            }
        }
    }
    
    @PutMapping("/update")
    public ResponseEntity<String> updateQualifications(@RequestBody Qualification qualifications) {
        if (qualifications.getJobPostId() != null && qualifications.getProfessionalUsername() != null) {
            return ResponseEntity.badRequest().body("Qualifications cannot have both a JobPostId and a ProfessionalUsername");
        }
        
        boolean success = qualificationService.updateQualifications(qualifications);

        if (success) {
            return ResponseEntity.ok("Successfully updated qualifications");
        } else {
            if (qualifications.getJobPostId() == null) {
                return ResponseEntity.badRequest().body("No Professional exists with username " + qualifications.getProfessionalUsername());
            } else {
                return ResponseEntity.badRequest().body("No Job Post exists with id " + qualifications.getJobPostId());
            }
        }
    }
}
