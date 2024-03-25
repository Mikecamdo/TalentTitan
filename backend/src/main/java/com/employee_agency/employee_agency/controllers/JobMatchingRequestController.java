package com.employee_agency.employee_agency.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employee_agency.employee_agency.services.JobMatchingRequestService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/job-matching-requests")
public class JobMatchingRequestController {
    @Autowired
    private JobMatchingRequestService jobMatchingRequestService;

    @PostMapping("/add")
    public ResponseEntity<String> addRequest(@RequestBody String professionalUsername) {
        jobMatchingRequestService.createRequest(professionalUsername);
        return ResponseEntity.ok("Request added successfully");
    }

    @DeleteMapping("/approve")
    public ResponseEntity<String> approveRequest(@RequestBody String professionalUsername) {
        jobMatchingRequestService.approveRequest(professionalUsername);
        return ResponseEntity.ok("Request approved successfully");
    }
    
}
