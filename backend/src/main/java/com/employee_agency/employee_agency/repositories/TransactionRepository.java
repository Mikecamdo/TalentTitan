package com.employee_agency.employee_agency.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.employee_agency.employee_agency.entities.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    
    Transaction save(Transaction transaction);
    List<Transaction> findAllByUsername(String username);
}
