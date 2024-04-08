package com.employee_agency.employee_agency.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.employee_agency.employee_agency.entities.User;

public interface UserRepository extends JpaRepository<User, String> {
    
    User save(User user);
    boolean existsByUsername(String username);
}
