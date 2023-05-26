package com.gaga.bo.web.payment;

import java.util.List;
import java.util.Map;

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
@RequestMapping("rest/payment")
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
		
		/* 테스트 데이터
		 * { "payNo": "imp_1234543231", "userNo": 11, "meetingNo": 4, "meetingName":
		 * "meeting4", "payTime": "2023-05-25T14:31:52.039Z", "entryFee": 3000 }
		 */
		paymentService.addPayment(payment);
				
	}

	@GetMapping("no/{payNo}")
	public Payment getPayment(@PathVariable String payNo) throws Exception{
		
		System.out.println("결제 내역 상세 조회 Ctrl");
		
		return paymentService.getPayment(payNo);
		
	}

	@PatchMapping("refund")
	public void updatePayment(@RequestBody Map<String, Integer> refund) throws Exception{
		
		System.out.println("환불시 결제번호 출력 Ctrl");
		
		String payNo = paymentService.getPayNoByUserMeeting(refund);
		
		System.out.println("결제번호는?" + payNo);
		
		paymentService.updatePayment(payNo);
	}
	
	@GetMapping("list/{userNo}")
	public List<Payment> getPaymentList(@PathVariable int userNo) throws Exception{
		
		System.out.println("회원별 결제 내역 목록 조회 Ctrl");
		
		return paymentService.getPaymentList(userNo);
	}
	
		
	//정산 	
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
	
	@PatchMapping("adjustment")
	public void updateAdjustmentState(@RequestBody Meeting meeting) throws Exception{
		
		System.out.println("정산 상태 변경 Ctrl");
		
		paymentService.updateAdjustmentState(meeting);
	}
	

}
