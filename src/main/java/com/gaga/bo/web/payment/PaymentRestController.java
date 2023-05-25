package com.gaga.bo.web.payment;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

	@PostMapping("")
	public void addPayment(@RequestBody Payment payment) throws Exception{
		
		System.out.println("결제 내역 추가 Ctrl" + payment);
		
		paymentService.addPayment(payment);
				
	}

	@GetMapping("no/{payNo}")
	public Payment getPayment(@PathVariable String payNo) throws Exception{
		
		System.out.println("결제 내역 상세 조회 Ctrl");
		
		return paymentService.getPayment(payNo);
		
	}
	
	@PatchMapping("refund/{userNo}/{meetingNo}")
	public void updatePayment(@RequestAttribute int userNo, @RequestAttribute int meetingNo) throws Exception{
		
		System.out.println("환불시 결제 상태 변경 Ctrl");
		
		paymentService.updatePayment(userNo, meetingNo);
	}
	
	@GetMapping("list/{userNo}")
	public List<Payment> getPaymentList(@PathVariable int userNo) throws Exception{
		
		System.out.println("회원별 결제 내역 목록 조회 Ctrl");
		
		return paymentService.getPaymentList(userNo);
	}
	
	@GetMapping()
	public String getPayNoByUserMeeting(@PathVariable int userNo, @PathVariable int meetingNo) throws Exception{
		
		System.out.println("모임, 유저번호로 결제번호 출력 Ctrl => 결제번호로 환불처리");
		
		return paymentService.getPayNoByUserMeeting(userNo, meetingNo);
	}
	
		
	//정산 	
	@PatchMapping("updateAdjustment")
	public void updateAdjustment(@RequestBody Meeting meeting) throws Exception{
		
		System.out.println("정산 정보 추가 Ctrl");
		
		paymentService.updateAdjustment(meeting);		
	}
	
	@GetMapping("adjustment")
	public List<Meeting> getAllAdjustmentList() throws Exception{
		
		System.out.println("정산 목록 전체 조회 Ctrl");
		
		return paymentService.getAllAdjustmentList();
		
	}
	
	@GetMapping("adjustment/{userNo}")
	public List<Meeting> getAdjustmentList(@PathVariable int userNo) throws Exception{
		
		System.out.println("회원별 정산 목록 조회 Ctrl");
		
		return paymentService.getAdjustmentList(userNo);
	}
	
	@PatchMapping("adjutment")
	public void updateAdjustmentState(@RequestBody Meeting meeting) throws Exception{
		
		System.out.println("정산 상태 변경 Ctrl");
		
		paymentService.updateAdjustmentState(meeting);
	}
	

}
