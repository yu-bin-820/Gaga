package com.gaga.bo.service.payment.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gaga.bo.service.domain.Payment;
import com.gaga.bo.service.payment.PaymentDao;
import com.gaga.bo.service.payment.PaymentService;

@Service
public class PaymentServiceImpl implements PaymentService {
	
	//Field
	@Autowired
	private PaymentDao paymentDao;
	public void setPaymentDao(PaymentDao paymentDao) {
		this.paymentDao = paymentDao;
		
	}
	
	//Constructor
	public PaymentServiceImpl() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public void addPayment(Payment payment) throws Exception {
		
		paymentDao.addPayment(payment);
		// TODO Auto-generated method stub
		
	}

	@Override
	public Payment getPayment(String payNo) throws Exception {

		return paymentDao.getPayment(payNo);
	}
}
