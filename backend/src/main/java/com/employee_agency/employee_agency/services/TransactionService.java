package com.employee_agency.employee_agency.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.entities.Transaction;
import com.employee_agency.employee_agency.repositories.TransactionRepository;

@Service
public class TransactionService {
    
    @Autowired
    private TransactionRepository transactionRepository;

    public void createTransaction(Transaction transaction) {
        transactionRepository.save(transaction);
    }

    public void updateTransaction(Transaction transaction) {
        Transaction currentTransaction = transactionRepository.findById(transaction.getCustomerID())
            .orElseThrow(() -> new RuntimeException("Transaction not found"));

        currentTransaction.setCustomerID(transaction.getCustomerID());
        currentTransaction.setAmountPaid(transaction.getAmuntPaid());
        currentTransaction.setTransactionDate(transaction.getTransactionDate());

        transactionRepository.save(currentTransaction);
    }

}
