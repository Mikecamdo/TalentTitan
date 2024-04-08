package com.employee_agency.employee_agency.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.employee_agency.employee_agency.entities.Staff;
import com.employee_agency.employee_agency.entities.User;
import com.employee_agency.employee_agency.repositories.NewEmployerRequestsRepository;
import com.employee_agency.employee_agency.repositories.NewProfessionalRequestsRepository;
import com.employee_agency.employee_agency.repositories.StaffRepository;
import com.employee_agency.employee_agency.repositories.UserRepository;

@Service
public class StaffService {
    
    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NewProfessionalRequestsRepository newProfessionalRequestsRepository;

    @Autowired
    private NewEmployerRequestsRepository newEmployerRequestsRepository;


    public boolean createStaff(Staff staff) {
        // check if username is already used by a registered user
        boolean invalidUsername = userRepository.existsByUsername(staff.getUsername());
        
        // check if username is already in an employer request
        if (!invalidUsername) {
            invalidUsername = newEmployerRequestsRepository.existsById(staff.getUsername());
        }

        // check if username is already in a professional request
        if (!invalidUsername) {
            invalidUsername = newProfessionalRequestsRepository.existsById(staff.getUsername());
        }

        if (invalidUsername) {
            return false;
        }

        User newUser = new User();
        newUser.setUsername(staff.getUsername());
        newUser.setPassword("random"); //TODO: make this actually random
        newUser.setFirstLogin(true);
        newUser.setIsActive(true);
        newUser.setUserType("staff");

        userRepository.save(newUser);

        staffRepository.save(staff);

        return true;
    }

    public void updateStaff(Staff staff) {
        Staff currentStaff = staffRepository.findById(staff.getUsername())
            .orElseThrow(() -> new RuntimeException("Staff not found"));

        currentStaff.setPhone(staff.getPhone());
        currentStaff.setEmail(staff.getEmail());

        staffRepository.save(currentStaff);
    }

}
