package com.employee_agency.employee_agency.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.entities.Transaction;
import com.employee_agency.employee_agency.repositories.TransactionRepository;

@Service
public class TransactionService {
    
    @Autowired
    private TransactionRepository transactionRepository;

    public List<Transaction> getUserTransactions(String username) {
        return transactionRepository.findAllByUsername(username);
    }

    public void createTransaction(Transaction transaction) {
        transactionRepository.save(transaction);
    }

    public void updateTransaction(Transaction transaction) {
        Transaction currentTransaction = transactionRepository.findById(transaction.getId())
            .orElseThrow(() -> new RuntimeException("Transaction not found"));

        currentTransaction.setUsername(transaction.getUsername());
        currentTransaction.setAmountPaid(transaction.getAmountPaid());
        currentTransaction.setTransactionDate(transaction.getTransactionDate());

        transactionRepository.save(currentTransaction);
    }

}
