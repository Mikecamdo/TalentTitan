package com.employee_agency.employee_agency.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employee_agency.employee_agency.entities.JobPost;
import com.employee_agency.employee_agency.services.JobPostService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/job-posts")
public class JobPostController {
    @Autowired
    private JobPostService jobPostService;

    @GetMapping("/get-all")
    public ResponseEntity<List<JobPost>> getAllJobs() {
        return ResponseEntity.ok(jobPostService.getAllJobs());
    }
    

    @GetMapping("/get-by-company-job-id")
    public ResponseEntity<JobPost> getJobByCompanyJobId(@RequestParam String employerUsername, @RequestParam String jobId) {
        JobPost job = jobPostService.getJobByCompanyJobId(employerUsername, jobId);

        if (job == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(job);
        }
    }
    

    @GetMapping("/get-by-company")
    public ResponseEntity<List<JobPost>> getJobsByCompany(@RequestParam String employerUsername) {
        List<JobPost> jobs = jobPostService.getJobsByCompany(employerUsername);

        if (jobs == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(jobs);
        }
    }
    

    @PostMapping("/add")
    public ResponseEntity<String> addJobPost(@RequestBody JobPost jobPost) {
        boolean success = jobPostService.addJobPost(jobPost);

        if (success) {
            return ResponseEntity.ok("Added Job Post");
        } else {
            return ResponseEntity.badRequest().body("CompanyJobId " + jobPost.getCompanyJobId() + " is already in use by " + jobPost.getEmployerId());
        }
        
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateJobPost(@RequestBody JobPost jobPost) {
        boolean success = jobPostService.updateJobPost(jobPost);

        if (success) {
            return ResponseEntity.ok("Updated Job Post");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteJobPost(@RequestParam Long jobPostId) {
        jobPostService.deleteJobPost(jobPostId);

        return ResponseEntity.ok("Deleted Job Post");
    }
}
