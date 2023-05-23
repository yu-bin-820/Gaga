package com.gaga.bo.web.payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gaga.bo.service.domain.Meeting;
import com.gaga.bo.service.domain.Payment;
import com.gaga.bo.service.meeting.MeetingService;
import com.gaga.bo.service.payment.PaymentService;

@RestController
@RequestMapping("/rest/payment")
public class PaymentRestController {
	
	//Field
	@Autowired
	@Qualifier("paymentServiceImpl")
	private PaymentService paymentService;
	
	@Autowired
	@Qualifier("meetingServiceImpl")
	private MeetingService meetingService;
	

	//Constructor
	public PaymentRestController() {
		System.out.println(this.getClass());
		// TODO Auto-generated constructor stub
	}
	
	//결제관리
	//결제 내역 추가
	@PostMapping("")
	public void addPayment(@RequestBody Payment payment) throws Exception{
		System.out.println("결제 성공시 넘어오는 정보" + payment);
		
		paymentService.addPayment(payment);
				
	}
	//결제 내역 상세 조회
	
	//환불시 결제 내역 상태 변경
	@PatchMapping("updatePayment/{userNo}/{meetingNo}")
	public void updatePayment(@RequestAttribute int userNo, @RequestAttribute int meetingNo) throws Exception{
		paymentService.updatePayment(userNo, meetingNo);
	}
	
	//회원별 결제 내역 목록 조회
	
	//회원, 모임 정보로 가져온 결제 번호
	
	//정산 내역 추가
	@PatchMapping("updateAdjustment")
	public void updateAdjustment(@RequestBody Meeting meeting) throws Exception{
		System.out.println("정산 정보 추가");
		paymentService.updateAdjustment(meeting);		
	}
	
	//정산 
	
	
	

}
