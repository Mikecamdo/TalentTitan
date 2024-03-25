package com.employee_agency.employee_agency.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.employee_agency.employee_agency.entities.Balance;

public interface BalanceRepository extends JpaRepository<Balance, String> {
    Balance save(Balance balance);
}
