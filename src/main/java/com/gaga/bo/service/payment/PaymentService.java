package com.gaga.bo.service.payment;

import java.util.List;

import com.gaga.bo.service.domain.Meeting;
import com.gaga.bo.service.domain.Payment;
import com.gaga.bo.service.domain.User;


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
	
	//정산 정보 추가 정산상태(0:정산성공 1:정산실패), 정산시간, 은행명, 계좌번호
	public void updateAdjustment(Meeting meeting) throws Exception;
	
	//정산상태 변경  state 정산실패1->정산성공0
	public void updatePaymentState(Meeting meeting) throws Exception;
	
	//계좌 정보 입력
	public void updateAccount(User user) throws Exception;
	
	

}
