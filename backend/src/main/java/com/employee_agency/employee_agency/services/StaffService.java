package com.employee_agency.employee_agency.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.entities.Staff;
import com.employee_agency.employee_agency.repositories.StaffRepository;

@Service
public class StaffService {
    
    @Autowired
    private StaffRepository staffRepository;

    public void createStaff(Staff staff) {
        staffRepository.save(staff);
    }
}
