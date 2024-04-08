package com.employee_agency.employee_agency.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.employee_agency.employee_agency.dto.PaymentDto;
import com.employee_agency.employee_agency.entities.Balance;
import com.employee_agency.employee_agency.services.BalanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/balances")
public class BalanceController {
    @Autowired
    private BalanceService balanceService;

    @GetMapping("/get-by-user")
    public ResponseEntity<Balance> getBalanceByUser(@RequestParam String username) {
        Balance balance = balanceService.getBalanceByUser(username);

        if (balance == null) {
            return ResponseEntity.ok(balance);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addBalance(@RequestBody Balance balance) {
        balanceService.createBalance(balance);
        return ResponseEntity.ok("Added balance");
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateBalance(@RequestBody Balance balance) {
        balanceService.updateBalance(balance);
        return ResponseEntity.ok("Updated balance");
    }

    @PatchMapping("/pay")
    public ResponseEntity<String> payBalance(@RequestBody PaymentDto payment) {
        balanceService.payBalance(payment.getUsername(), payment.getPaymentAmount());
        return ResponseEntity.ok("Payment successful");
    }
}
