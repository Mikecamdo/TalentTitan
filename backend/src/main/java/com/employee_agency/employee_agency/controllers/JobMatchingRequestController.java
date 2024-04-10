package com.employee_agency.employee_agency.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employee_agency.employee_agency.entities.JobMatchingRequest;
import com.employee_agency.employee_agency.services.JobMatchingRequestService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/job-matching-requests")
public class JobMatchingRequestController {
    @Autowired
    private JobMatchingRequestService jobMatchingRequestService;

    @GetMapping("/get-all")
    public ResponseEntity<List<JobMatchingRequest>> getAllRequests() {
        return ResponseEntity.ok(jobMatchingRequestService.getAllRequests());
    }
    
    @PostMapping("/add")
    public ResponseEntity<String> addRequest(@RequestBody String professionalUsername) {
        boolean success = jobMatchingRequestService.createRequest(professionalUsername);
        
        if (success) {
            return ResponseEntity.ok("Request added successfully");
        } else {
            return ResponseEntity.badRequest().body("No Professional exists with the username " + professionalUsername);
        }
        
    }

    @DeleteMapping("/approve")
    public ResponseEntity<String> approveRequest(@RequestBody String professionalUsername) {
        jobMatchingRequestService.approveRequest(professionalUsername);
        return ResponseEntity.ok("Request approved successfully");
    }
}
