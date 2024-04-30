package com.employee_agency.employee_agency.services;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.employee_agency.employee_agency.entities.Balance;
import com.employee_agency.employee_agency.entities.Transaction;
import com.employee_agency.employee_agency.repositories.BalanceRepository;
import com.employee_agency.employee_agency.repositories.TransactionRepository;

@Service
public class BalanceService {
    @Autowired
    private BalanceRepository balanceRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    public Balance getBalanceByUser(String username) {
        Optional<Balance> balance = balanceRepository.findById(username);

        if (balance.isPresent()) {
            return balance.get();
        } else {
            return null;
        }
    }

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

    public Balance payBalance(String username, String paymentAmount) {
        Balance currentBalance = balanceRepository.findById(username)
            .orElseThrow(() -> new RuntimeException("Balance not found"));

        String amountDue = currentBalance.getAmountDue();

        double num1 = Double.parseDouble(paymentAmount);
        double num2 = Double.parseDouble(amountDue);

        double remainingDue = num2 - num1;

        String newAmountDue = "" + remainingDue;

        currentBalance.setAmountDue(newAmountDue);

        balanceRepository.save(currentBalance);

        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String dateString = currentDate.format(formatter);

        Transaction newTransaction = new Transaction();

        newTransaction.setUsername(username);
        newTransaction.setAmountPaid(paymentAmount);
        newTransaction.setTransactionDate(dateString);

        transactionRepository.save(newTransaction);

        return currentBalance;
    }
}
