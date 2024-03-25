package com.employee_agency.employee_agency.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.employee_agency.employee_agency.entities.Balance;
import com.employee_agency.employee_agency.repositories.BalanceRepository;

@Service
public class BalanceService {
    @Autowired
    private BalanceRepository balanceRepository;

    public void createBalance(Balance balance) {
        balanceRepository.save(balance);
    }

    public void updateBalance(Balance balance) {
        Balance currentBalance = balanceRepository.findById(balance.getUsername())
            .orElseThrow(() -> new RuntimeException("Balance not found"));

        currentBalance.setAmountDue(balance.getAmountDue());
        currentBalance.setDueDate(balance.getDueDate());

        balanceRepository.save(currentBalance);
    }
}
