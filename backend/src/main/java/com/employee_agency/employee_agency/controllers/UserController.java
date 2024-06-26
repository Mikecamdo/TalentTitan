package com.employee_agency.employee_agency.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.employee_agency.employee_agency.dto.LoginRequest;
import com.employee_agency.employee_agency.dto.UpdatePasswordRequest;
import com.employee_agency.employee_agency.dto.UserDto;
import com.employee_agency.employee_agency.entities.User;
import com.employee_agency.employee_agency.services.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/get-all")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        UserDto user = userService.login(loginRequest);

        if (user == null) {
            return new ResponseEntity<>("Unsuccessful login attempt", HttpStatus.NOT_FOUND);
        } else {
            return ResponseEntity.ok(user);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        userService.createUser(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateUser(@RequestBody User user) {
        userService.updateUser(user);
        return ResponseEntity.ok("User updated successfully");
    }
    
    @PatchMapping("/update-password")
    public ResponseEntity<String> updatePassword(@RequestBody UpdatePasswordRequest request) {
        int status = userService.updatePassword(request.getUsername(), request.getOldPassword(), request.getNewPassword());
        
        switch (status) {
            case 200:
                return ResponseEntity.ok("Updated password");
        
            case 400:
                return ResponseEntity.badRequest().body("Incorrect old password");

            case 404:
            default:
                return ResponseEntity.notFound().build();
        }
    }
}
