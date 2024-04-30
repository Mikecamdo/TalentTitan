package com.employee_agency.employee_agency.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employee_agency.employee_agency.entities.JobMatch;
import com.employee_agency.employee_agency.services.JobMatchService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/job-matching")
public class JobMatchController {
    
    @Autowired
    private JobMatchService jobMatchService;

    @GetMapping("/get-by-user")
    public ResponseEntity<List<JobMatch>> getUserJobMatches(@RequestParam String username) {
        List<JobMatch> jobMatches = jobMatchService.getUserJobMatches(username);

        if (jobMatches != null) {
            return ResponseEntity.ok(jobMatches);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    

    @PostMapping("/add")
    public ResponseEntity<String> addJobMatch(@RequestBody String professionalUsername, @RequestBody Long jobId) {
        jobMatchService.addJobMatch(professionalUsername, jobId);
        return ResponseEntity.ok("Added Job Match");
    }
}
