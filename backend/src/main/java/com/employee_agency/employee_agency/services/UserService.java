package com.employee_agency.employee_agency.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.dto.LoginRequest;
import com.employee_agency.employee_agency.dto.UserDto;
import com.employee_agency.employee_agency.entities.User;
import com.employee_agency.employee_agency.repositories.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    public UserDto login(LoginRequest loginRequest) {
        User user = userRepository.findByUsernameAndPassword(loginRequest.getUsername(), loginRequest.getPassword());

        if (user != null) {
            UserDto userDto = new UserDto();

            userDto.setUsername(user.getUsername());
            userDto.setUserType(user.getUserType());
            userDto.setFirstLogin(user.getFirstLogin());
            
            return userDto;
        }

        return null;
    }

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

    public void updatePassword(String username, String oldPassword, String newPassword) {
        //TODO: Eventually need to hash password + check if old password is correct
        User currentUser = userRepository.findById(username)
            .orElseThrow(() -> new RuntimeException("User not found"));

        currentUser.setPassword(newPassword);

        userRepository.save(currentUser);
    }
}
