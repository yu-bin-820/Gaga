package com.gaga.bo.web.payment;

import java.math.BigInteger;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

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

	@PostMapping("") //결제완료 : 1 ,  결제취소 : 2
	public void addPayment(@RequestBody Payment payment) throws Exception{
		
		System.out.println("결제 내역 추가 Ctrl" + payment);
		
		String error_msg = "결제 실패지 뭐야";
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
	
	@PostMapping("refund/usermeeting")
	public String getPayNoByUserMeeting(@RequestBody Map<String, Object> refund) throws Exception{
		
		System.out.println("환불시 결제번호 출력 Ctrl");
		
		return paymentService.getPayNoByUserMeeting(refund);
	}

	@PatchMapping("refund/{payNo}") // 결제 취소 : 2
	public void updatePayment(@PathVariable String payNo) throws Exception{
		
		System.out.println("환불 Ctrl");
		
		System.out.println("결제번호는?" + payNo);
		
		paymentService.updatePayment(payNo);
	}
	
	@GetMapping("list/{userNo}")
	public List<Payment> getPaymentList(@PathVariable int userNo) throws Exception{
		
		System.out.println("회원별 결제 내역 목록 조회 Ctrl");
		
		return paymentService.getPaymentList(userNo);
	}
	
	@GetMapping("")
	public List<Payment> getAllPaymentList() throws Exception{
		
		System.out.println("전체 회원 결제 내역 목록 조회 Ctrl");
		
		return paymentService.getAllPaymentList();
	}
	
		
	//정산 	
	@GetMapping("adjustment")
	public List<Meeting> getAllAdjustmentList() throws Exception{
		
		System.out.println("정산 목록 전체 조회 Ctrl");
		
		return paymentService.getAllAdjustmentList();
		
	}
	
	@GetMapping("adjustment/state/{adjustmentState}")
	public List<Meeting> getAdjustmentIngList(@PathVariable("adjustmentState") int adjustmentState) throws Exception{
		
		System.out.println("정산 상태별 목록 조회 Ctrl"); //1: 정산대기 2: 정산완료
		
		return paymentService.getAdjustmentStateList(adjustmentState);
		
	}
	
	@GetMapping("adjustment/{userNo}")
	public List<Meeting> getAdjustmentList(@PathVariable int userNo) throws Exception{
		
		System.out.println("회원별 정산 목록 조회 Ctrl");
		
		return paymentService.getAdjustmentList(userNo);
	}
	
	@PatchMapping("adjustment")
	public void updateAdjustmentState(@RequestBody Meeting meeting) throws Exception{
		
		System.out.println("정산 상태 변경 Ctrl");
		
		paymentService.updateAdjustmentState(meeting.getMeetingNo());
	}
	
	@PostMapping("refund")
	public ResponseEntity<String> refund(@RequestBody Map<String, String> requestData) throws Exception {

	    String merchantUid = requestData.get("merchant_uid");

	    String IAMPORT_API_URL = "http://api.iamport.kr";

	    String accessToken = paymentService.getAccessToken();

	    if (!accessToken.isEmpty()) {
	        RestTemplate restTemplate = new RestTemplate();

	        HttpHeaders headers = new HttpHeaders();
	        headers.setContentType(MediaType.APPLICATION_JSON);
	        headers.set("Authorization", accessToken);
	        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

	        JSONObject refundRequest = new JSONObject();
	        refundRequest.put("merchant_uid", merchantUid);

	        HttpEntity<String> requestEntity = new HttpEntity<>(refundRequest.toJSONString(), headers);

	        ResponseEntity<String> responseEntity =
	                restTemplate.exchange(IAMPORT_API_URL + "/payments/cancel",
	                        HttpMethod.POST,
	                        requestEntity,
	                        String.class);

	        if (responseEntity.getStatusCode() == HttpStatus.OK) {
	        	
	        	paymentService.updatePayment(merchantUid);
	        	
	        	System.out.println("결제 번호는? "+ merchantUid);
         	
	        	System.out.println("환불처리가 성공적으로 진행되었습니다.");
	        	
	            return ResponseEntity.ok("Refund successful");
	        } else {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Refund failed");
	        }

	    } else {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to acquire access token");
	    }
	}
    @GetMapping("banks")
    public ResponseEntity<String> getBanks() throws Exception{
    	
    	String token = paymentService.getAccessToken();
    	
    	System.out.println("생성된 토큰은 이것입니다."+token);
        
	       String IAMPORT_API_URL = "https://api.iamport.kr/banks";
	            RestTemplate restTemplate = new RestTemplate();

	            ResponseEntity<String> responseEntity = restTemplate.getForEntity(IAMPORT_API_URL + "?_token=" + token, String.class);

	            if (responseEntity.getStatusCode().is2xxSuccessful()) {
	                return ResponseEntity.ok(responseEntity.getBody());
	                
	            } else {
	                return ResponseEntity.status(responseEntity.getStatusCode()).body("Failed to retrieve bank list.");
	            }
	        }
    
    @PostMapping("/account/holder")
    public ResponseEntity<String> getAccountHolder(@RequestBody Map<String, String> account) throws Exception {
    	
        BigInteger bankCode = new BigInteger(account.get("bank_code"));
        
        BigInteger bankNum = new BigInteger(account.get("bank_num"));
        
        String token = paymentService.getAccessToken();

        System.out.println("생성된 토큰은 이것입니다." + token);

        RestTemplate restTemplate = new RestTemplate();

        String IAMPORT_API_URL = "https://api.iamport.kr/vbanks/holder";

        String url = IAMPORT_API_URL + "?bank_code=" + bankCode
                + "&bank_num=" + bankNum + "&_token=" + token;

        System.out.println("요청보낼 URL은 " + url);
        
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        
        return ResponseEntity.ok(response.getBody());
    }
}

