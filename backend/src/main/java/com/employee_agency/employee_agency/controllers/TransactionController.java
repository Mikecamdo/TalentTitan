package com.employee_agency.employee_agency.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.employee_agency.employee_agency.entities.Transaction;
import com.employee_agency.employee_agency.services.TransactionService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/get-by-user")
    public ResponseEntity<List<Transaction>> getUserTransactions(@RequestParam String username) {
        List<Transaction> transactions = transactionService.getUserTransactions(username);

        if (transactions != null) {
            return ResponseEntity.ok(transactions);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    

    @PostMapping("/add")
    public ResponseEntity<String> addTransaction(@RequestBody Transaction transaction) {
        transactionService.createTransaction(transaction);
        return ResponseEntity.ok("Transaction registered successfully");
    }
    
    @PutMapping("/update")
    public ResponseEntity<String> updateTransaction(@RequestBody Transaction transaction) {
        transactionService.updateTransaction(transaction);
        return ResponseEntity.ok("Transaction updated successfully");
    }
}
