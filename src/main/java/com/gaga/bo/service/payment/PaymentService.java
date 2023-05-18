package com.gaga.bo.service.payment;

import java.util.List;

import com.gaga.bo.service.domain.Payment;


public interface PaymentService {
	
	//결제 내역 추가
	public void addPayment(Payment payment) throws Exception;
	
	//결제 내역 조회
	public Payment getPayment(String payNo) throws Exception;
	
	//회원, 모임에 대한 결제 정보 조회
	public String getPaymentByUserMeeting(int userNo, int meetingNo) throws Exception;
	
	//유저별 결제 내역 목록 조회
	public List<Payment> getPaymentList(int userNo) throws Exception;
	
	//결제 내역 수정(환불)
	public void updatePayment(int userNo, int meetingNo) throws Exception;
	
	

}
