package com.employee_agency.employee_agency.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employee_agency.employee_agency.entities.JobPost;
import com.employee_agency.employee_agency.services.JobPostService;

@RestController
@RequestMapping("/job-posts")
public class JobPostController {
    @Autowired
    private JobPostService jobPostService;

    @PostMapping("/add")
    public ResponseEntity<String> addJobPost(@RequestBody JobPost jobPost) {
        jobPostService.addJobPost(jobPost);
        return ResponseEntity.ok("Added Job Post");
    }
}
