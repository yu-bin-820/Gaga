package com.gaga.bo.service.payment;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.gaga.bo.service.domain.Meeting;
import com.gaga.bo.service.domain.Payment;
import com.gaga.bo.service.domain.User;

@Mapper
public interface PaymentDao {
	
	//결제
	//INSERT
	public void addPayment(Payment payment) throws Exception;
	
	//SELECT ONE
	public Payment getPayment(String payNo) throws Exception;
	
	//SELECT ONE
	public String getPayNoByUserMeeting(Map<String, Object> refund) throws Exception;
	
	//SELECT ONE
	public List<Payment> offerRefund() throws Exception;
	
	//SELECT LIST
	public List<Payment> getPaymentList(int userNo) throws Exception;
	
	//SELECT LIST
	public List<Payment> getAllPaymentList() throws Exception;
	
	//UPDATE 1: 결제완료 2: 환불완료
	public void updatePayment(String payNo) throws Exception;
	
	//정산
	//SELECT LIST 정산정보 전체 목록 조회(이후 상태별 조회)
	public List<Meeting> getAllAdjustmentList() throws Exception;
	
	//SELECT LIST 정산 대기 상태 목록 조회
	public List<Meeting> getAdjustmentStateList(int adjustmentState) throws Exception;
	
	//SELECT LIST 회원별 정산 목록 조회
	public List<Meeting> getAdjustmentList(int userNo) throws Exception;

	//UPDATE 정산상태 변경 1:정산대기 2:정산성공 3:정산실패
	public void updateAdjustmentState(int meetingNo) throws Exception;
	
	//멤버 수 출력
	//SELECT 
	public int getTotalCount(int meetingNo) throws Exception;
	
		
}
