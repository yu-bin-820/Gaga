package com.gaga.bo.service.payment;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.gaga.bo.service.domain.Payment;

@Mapper
public interface PaymentDao {
	
	//INSERT
	public void addPayment(Payment payment) throws Exception;
	
	//SELECT ONE 사실상 필요는 없음
	public Payment getPayment(String payNo) throws Exception;
	
	//SELECT ONE
	public String getPaymentByUserMeeting(int userNo, int meetingNo) throws Exception;
	
	//SELECT LIST
	public List<Payment> getPaymentList(int userNo) throws Exception;
	
	//UPDATE
	public void updatePayment(String payNo) throws Exception;
	
	//INSERT
	//public void add
	

}
