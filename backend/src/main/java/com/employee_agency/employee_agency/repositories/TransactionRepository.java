package com.employee_agency.employee_agency.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.employee_agency.employee_agency.entities.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, String> {
    
    Transaction save(Transaction transaction);
}
