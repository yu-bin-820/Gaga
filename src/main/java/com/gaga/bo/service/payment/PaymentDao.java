package com.gaga.bo.service.payment;

import java.util.List;

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
	public String getPayNoByUserMeeting(int userNo, int meetingNo) throws Exception;
	
	//SELECT LIST
	public List<Payment> getPaymentList(int userNo) throws Exception;
	
	//UPDATE
	public void updatePayment(int userNo, int meetingNo) throws Exception;
	
	//정산
	//SELECT LIST 정산정보 전체 목록 조회(이후 상태별 조회)
	public List<Meeting> getAllAdjustmentList() throws Exception;
	
	//SELECT LIST 회원별 정산 목록 조회
	public List<Meeting> getAdjustmentList(int userNo) throws Exception;
	
	//SELECT LIST 
	//UPDATE time, state, bankName, accountNo
	public void updateAdjustment(Meeting meeting) throws Exception;
	
	//UPDATE 정산상태 변경  state 2->1
	public void updateAdjustmentState(Meeting meeting) throws Exception;
	
	//멤버 수 출력
	//SELECT 
	public int getTotalCount(int meetingNo) throws Exception;
	
		
}
