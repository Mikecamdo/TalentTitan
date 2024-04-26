package com.employee_agency.employee_agency.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.employee_agency.employee_agency.dto.ApproveRequestDto;
import com.employee_agency.employee_agency.dto.DenyRequestDto;
import com.employee_agency.employee_agency.entities.NewProfessionalRequests;
import com.employee_agency.employee_agency.services.NewProfessionalRequestsService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/new-professional")
public class NewProfessionalRequestsController {

    @Autowired
    private NewProfessionalRequestsService newProfessionalRequestsService;

    @GetMapping("/get-all")
    public ResponseEntity<List<NewProfessionalRequests>> getAllNewProfessionalRequests() {
        List<NewProfessionalRequests> requests = newProfessionalRequestsService.getAllRequests();
        return ResponseEntity.ok(requests);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerNewProfessionalRequests(@RequestBody NewProfessionalRequests newProfessionalRequests) {
        boolean success = newProfessionalRequestsService.createNewProfessionalRequests(newProfessionalRequests);
        
        if (success) {
            return ResponseEntity.ok("New Professional Request registered successfully");
        } else {
            return ResponseEntity.badRequest().body("Username is already in use");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateNewProfessionalRequests(@RequestBody NewProfessionalRequests newProfessionalRequests) {
        newProfessionalRequestsService.updateNewProfessionalRequests(newProfessionalRequests);
        return ResponseEntity.ok("New Professional Account updated successfully");
    }

    @PostMapping("/approve")
    public ResponseEntity<String> approveNewProfessionalRequest(@RequestBody ApproveRequestDto approval) {
        newProfessionalRequestsService.approveRequest(approval.getUsername(), approval.getAmountDue(), approval.getDueDate(), approval.getComment());
        return ResponseEntity.ok("Approved request successfully");
    }

    @PostMapping("/deny")
    public ResponseEntity<String> denyNewProfessionalRequest(@RequestBody DenyRequestDto denial) {
        newProfessionalRequestsService.denyRequest(denial.getUsername(), denial.getComment());
        return ResponseEntity.ok("Denied request successfully");
    }
}
