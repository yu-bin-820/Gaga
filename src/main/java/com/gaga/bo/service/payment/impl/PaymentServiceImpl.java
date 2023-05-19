package com.gaga.bo.service.payment.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gaga.bo.service.domain.Meeting;
import com.gaga.bo.service.domain.Payment;
import com.gaga.bo.service.domain.User;
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
	public String getPaymentByUserMeeting(int userNo, int meetingNo) throws Exception {
		
		System.out.println("회원, 모임 정보로 결제 정보 가져오기");
		
		return paymentDao.getPaymentByUserMeeting(userNo, meetingNo);
	}

	@Override
	public void updatePayment(int userNo, int meetingNo) throws Exception {
		
		String payNo = new String();
				
		payNo =	getPaymentByUserMeeting(userNo, meetingNo);
		System.out.println("환불시 결제 상태 변화");
		
		paymentDao.updatePayment(payNo);
			
	}

	@Override
	public List<Payment> getPaymentList(int userNo) throws Exception {
		
		System.out.println("결제 내역 목록 조회");
		
		return paymentDao.getPaymentList(userNo);
	}

	@Override
	public void updateAdjustment(Meeting meeting) throws Exception {
		
		System.out.println("정산 내역 추가");
		
		paymentDao.updateAdjustment(meeting);
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updatePaymentState(Meeting meeting) throws Exception {
		
		System.out.println("정산 상태 변경");
		
		paymentDao.updateAdjustmentState(meeting);
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateAccount(User user) throws Exception {
		
		System.out.println("계좌 정보 등록");
		
		paymentDao.updateAccount(user);
		
	}


}
