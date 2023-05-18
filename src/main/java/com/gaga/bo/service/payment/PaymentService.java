package com.gaga.bo.service.payment;

import com.gaga.bo.service.domain.Payment;


public interface PaymentService {
	
	//결제 내역 추가
	public void addPayment(Payment payment) throws Exception;
	
	//결제 내역 조회
	public Payment getPayment(String payNo) throws Exception;
	
	//결제 내역 수정(환불)
	public void updatePayment(Payment payment) throws Exception;

}
