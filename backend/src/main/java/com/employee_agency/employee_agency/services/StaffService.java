package com.employee_agency.employee_agency.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.employee_agency.employee_agency.entities.Staff;
import com.employee_agency.employee_agency.entities.User;
import com.employee_agency.employee_agency.repositories.StaffRepository;
import com.employee_agency.employee_agency.repositories.UserRepository;

@Service
public class StaffService {
    
    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private UserRepository userRepository;

    public void createStaff(Staff staff) {
        User newUser = new User();
        newUser.setUsername(staff.getUsername());
        newUser.setPassword("random"); //TODO: make this actually random
        newUser.setFirstLogin(true);
        newUser.setIsActive(true);
        newUser.setUserType("staff");

        userRepository.save(newUser);

        staffRepository.save(staff);
    }

    public void updateStaff(Staff staff) {
        Staff currentStaff = staffRepository.findById(staff.getUsername())
            .orElseThrow(() -> new RuntimeException("Staff not found"));

        currentStaff.setPhone(staff.getPhone());
        currentStaff.setEmail(staff.getEmail());

        staffRepository.save(currentStaff);
    }

}
