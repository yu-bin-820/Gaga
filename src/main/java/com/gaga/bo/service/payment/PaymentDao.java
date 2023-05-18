package com.gaga.bo.service.payment;

import org.apache.ibatis.annotations.Mapper;

import com.gaga.bo.service.domain.Payment;

@Mapper
public interface PaymentDao {
	
	//INSERT
	public void addPayment(Payment payment) throws Exception;
	
	//SELECT ONE
	public Payment getPayment(String payNo) throws Exception;
	
	

}
