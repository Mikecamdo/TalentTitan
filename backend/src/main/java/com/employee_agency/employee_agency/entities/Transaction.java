package com.employee_agency.employee_agency.entities;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "transaction")
public class Transaction {
    @Id
    private String customerID;
    private int amountPaid;
    private Date transactionDate;


    public String getCustomerID() {
        return customerID;
    }
    public void setCustomerID(String customerID) {
        this.customerID = customerID;
    }
    
    public int getAmuntPaid() {
        return amountPaid;
    }
    public void setAmountPaid(int amountPaid) {
        this.amountPaid = amountPaid;
    }

    public Date getTransactionDate() {
        return transactionDate;
    }
    public void setTransactionDate(Date transactionDate) {
        this.transactionDate = transactionDate;
    }

}
