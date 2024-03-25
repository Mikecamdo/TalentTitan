package com.employee_agency.employee_agency.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.entities.User;
import com.employee_agency.employee_agency.repositories.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    public void createUser(User user) {
        userRepository.save(user);
    }

    public void updateUser(User user) {
        User currentUser = userRepository.findById(user.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));

        currentUser.setPassword(user.getPassword());
        currentUser.setUserType(user.getUserType());
        currentUser.setFirstLogin(user.getFirstLogin());

        userRepository.save(currentUser);
    }

}
