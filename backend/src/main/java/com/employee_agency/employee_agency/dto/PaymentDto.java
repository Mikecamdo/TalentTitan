package com.employee_agency.employee_agency.dto;

public class PaymentDto {
    private String username;
	private String paymentAmount;

    public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}

	public String getPaymentAmount() {
		return paymentAmount;
	}
	public void setPaymentAmount(String paymentAmount) {
		this.paymentAmount = paymentAmount;
	}
}
