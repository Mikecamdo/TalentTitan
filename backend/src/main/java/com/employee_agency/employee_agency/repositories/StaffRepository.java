package com.employee_agency.employee_agency.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.employee_agency.employee_agency.entities.Staff;

public interface StaffRepository extends JpaRepository<Staff, String> {
    
    Staff save(Staff staff);
}
