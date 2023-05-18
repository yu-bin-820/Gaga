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
		System.out.println(this.getClass());
		// TODO Auto-generated constructor stub
	}

	@Override
	public void addPayment(Payment payment) throws Exception {
		
		System.out.println("결제 내역 추가");
		
		paymentDao.addPayment(payment);
		
	}

	@Override
	public Payment getPayment(String payNo) throws Exception {
		
		System.out.println("결제 내역 1건만 조회");

		return paymentDao.getPayment(payNo);
	}

	@Override
	public void updatePayment(Payment payment) throws Exception {
		
		System.out.println("환불시 결제 상태 변화");
		// TODO Auto-generated method stub
		paymentDao.updatePayment(payment);
		
		
	}


}
