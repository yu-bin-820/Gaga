package com.gaga.bo.service.payment;

import java.util.List;
import java.util.Map;

import com.gaga.bo.service.domain.Meeting;
import com.gaga.bo.service.domain.Payment;
import com.gaga.bo.service.domain.User;


public interface PaymentService {
	
	//결제 내역 추가
	public void addPayment(Payment payment) throws Exception;
	
	//결제 내역 1건 상세 조회
	public Payment getPayment(String payNo) throws Exception;

	//회원별 결제 내역 목록 조회
	public List<Payment> getPaymentList(int userNo) throws Exception;
	
	//전체 회원 결제 내역 목록 조회 
	public List<Payment> getAllPaymentList() throws Exception;
	
	//결제 내역 수정(환불)
	public void updatePayment(String payNo) throws Exception;
	
	//참여거절, 내보내기 회원에게 환불
	public void deleteMemberRefund(Map<String, Integer> map) throws Exception;
	
	//모임, 유저번호로 결제번호 가져오기
	public String getPayNoByUserMeeting(Map<String, Object> refund) throws Exception;
	
	//정산 목록 조회(운영자)
	public List<Meeting> getAllAdjustmentList() throws Exception;
	
	//정산 목록 조회(회원)
	public List<Meeting> getAdjustmentList(int userNo) throws Exception;
	
	//정산 상태별 목록 조회 state 1 :정산대기
	public List<Meeting> getAdjustmentStateList(int adjustmentState) throws Exception;

	//정산상태 변경  state 정산대기1->정산성공2
	public void updateAdjustmentState(int meetingNo) throws Exception;
	
	//아임포트 토큰 발급
	public String getAccessToken() throws Exception;
	
}
