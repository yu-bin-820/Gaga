package com.gaga.bo.service.payment.impl;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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
	
	private static final String IMP_KEY = "3120528761584822";
	private static final String IMP_SECRET = "HeWea1iuXMM1McOJys1PrhUYeMiDc6C3XnEa5h0oIc2bIz3vOo1Kemy2H2xkwmyxSbSz5eZ5l3dNeEUA";
	private static final String IAMPORT_API_URL = "http://api.iamport.kr";

	//Constructor
	public PaymentServiceImpl() {
		System.out.println(this.getClass());
	}

	@Override
	public void addPayment(Payment payment) throws Exception {
		
		System.out.println("결제 내역 추가 서비스");
		
		paymentDao.addPayment(payment);
		
	}

	@Override
	public Payment getPayment(String payNo) throws Exception {
		
		System.out.println("결제 내역 상세 조회 서비스");

		return paymentDao.getPayment(payNo);
	}

	@Override
	public void updatePayment(String payNo) throws Exception {
		
		System.out.println("환불시 결제 상태 변경 서비스");

		paymentDao.updatePayment(payNo);
			
	}

	@Override
	public String getPayNoByUserMeeting(Map<String, Object> refund) throws Exception {
		
		System.out.println("모임, 유저번호로 결제번호 출력 서비스");
		
		return paymentDao.getPayNoByUserMeeting(refund);
	}

	@Override
	public List<Payment> getPaymentList(int userNo) throws Exception {
		
		System.out.println("회원별 결제 내역 목록 조회 서비스");
		
		return paymentDao.getPaymentList(userNo);
	}

	@Override
	public List<Meeting> getAllAdjustmentList() throws Exception {
		
		System.out.println("정산 목록 전체 조회 서비스");
		
		return paymentDao.getAllAdjustmentList();
	}

	@Override
	public List<Meeting> getAdjustmentList(int userNo) throws Exception {
		
		System.out.println("회원별 정산 목록 조회 서비스");
		
		return paymentDao.getAdjustmentList(userNo);
		
	}


	@Override
	public void updateAdjustmentState(Meeting meeting) throws Exception {
		
		System.out.println("정산 상태 변경 서비스");
		
		paymentDao.updateAdjustmentState(meeting);
		// TODO Auto-generated method stub 	
	}

	@Override
	public String getAccessToken() throws Exception {
		
		System.out.println("아임포트 토큰 발급 서비스");
		
		
		String accessToken = "";
		
		RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        JSONObject tokenRequest = new JSONObject();
        tokenRequest.put("imp_key", IMP_KEY);
        tokenRequest.put("imp_secret", IMP_SECRET);

        HttpEntity<String> requestEntity = new HttpEntity<>(tokenRequest.toJSONString(), headers);
        ResponseEntity<String> responseEntity =
                restTemplate.exchange(IAMPORT_API_URL + "/users/getToken",
                        HttpMethod.POST,
                        requestEntity,
                        String.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            try {
                JSONObject jsonResponse = (JSONObject) new JSONParser().parse(responseEntity.getBody());
                JSONObject response = (JSONObject) jsonResponse.get("response");
                accessToken = (String) response.get("access_token");
            }  catch (ParseException e) {
                e.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return accessToken;
    }
		
}
