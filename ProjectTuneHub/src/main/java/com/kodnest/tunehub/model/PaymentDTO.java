package com.kodnest.tunehub.model;

public class PaymentDTO {
	public String orderId;
	public String paymentId;
	public String signature;
	
	public PaymentDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	public String getPaymentId() {
		return paymentId;
	}
	public void setPaymentId(String paymentId) {
		this.paymentId = paymentId;
	}
	public String getSignature() {
		return signature;
	}
	public void setSignature(String signature) {
		this.signature = signature;
	}
	
	@Override
	public String toString() {
		return "PaymentDTO [orderId=" + orderId + ", paymentId=" + paymentId + ", signature=" + signature +  "]";
	}
	
	

}
