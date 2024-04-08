package com.employee_agency.employee_agency.controllers;

import org.springframework.web.bind.annotation.RestController;
import com.employee_agency.employee_agency.entities.Staff;
import com.employee_agency.employee_agency.services.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/staff")
public class StaffController {

    @Autowired
    private StaffService staffService;

    @PostMapping("/register")
    public ResponseEntity<String> registerStaff(@RequestBody Staff staff) {
        boolean success = staffService.createStaff(staff);

        if (success) {
            return ResponseEntity.ok("Staff member registered successfully");
        } else {
            return ResponseEntity.badRequest().body("Username is already in use");
        }
    }
    
    @PutMapping("/update")
    public ResponseEntity<String> updateStaff(@RequestBody Staff staff) {
        staffService.updateStaff(staff);
        return ResponseEntity.ok("Staff updated successfully");
    }
}
