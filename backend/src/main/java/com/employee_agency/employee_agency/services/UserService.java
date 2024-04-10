package com.employee_agency.employee_agency.services;

import java.util.List;
import java.util.Optional;

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

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public UserDto login(LoginRequest loginRequest) {
        User user = userRepository.findByUsernameAndPasswordAndIsActive(loginRequest.getUsername(), loginRequest.getPassword(), true);

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

    public int updatePassword(String username, String oldPassword, String newPassword) {
        //TODO: Eventually need to hash password

        Optional<User> currentUser = userRepository.findById(username);

        if (currentUser.isPresent()) {
            User user = currentUser.get();

            if (user.getPassword().equals(oldPassword)) {
                user.setPassword(newPassword);

                userRepository.save(user);

                return 200;
            }

            return 400;
        }

        return 404;
    }
}
