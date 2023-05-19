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
	
	//SELECT ONE 사실상 필요는 없음
	//public Payment getPayment(String payNo) throws Exception;
	
	//SELECT ONE
	public String getPaymentByUserMeeting(int userNo, int meetingNo) throws Exception;
	
	//SELECT LIST
	public List<Payment> getPaymentList(int userNo) throws Exception;
	
	//UPDATE
	public void updatePayment(String payNo) throws Exception;
	
	//정산
	//UPDATE time, state, bankName, accountNo
	public void updateAdjustment(Meeting meeting) throws Exception;
	
	//UPDATE 정산상태 변경  state 2->1
	public void updateAdjustmentState(Meeting meeting) throws Exception;
	
	//UPDATE
	public void updateAccount(User user) throws Exception;
		
}
