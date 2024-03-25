package com.employee_agency.employee_agency.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employee_agency.employee_agency.services.JobMatchingService;

@RestController
@RequestMapping("/job-matching")
public class JobMatchingController {
    
    @Autowired
    private JobMatchingService jobMatchingService;

    @PostMapping("/add")
    public ResponseEntity<String> addJobMatching(@RequestBody String professionalUsername, @RequestBody Long jobId) {
        jobMatchingService.addJobMatching(professionalUsername, jobId);
        return ResponseEntity.ok("Added Job Match");
    }
}
