package com.gaga.bo.service.payment.test;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.gaga.bo.service.community.CommunityService;
import com.gaga.bo.service.domain.Meeting;
import com.gaga.bo.service.domain.Payment;
import com.gaga.bo.service.domain.User;
import com.gaga.bo.service.meeting.MeetingService;
import com.gaga.bo.service.payment.PaymentService;

import junit.framework.Assert;

import static org.junit.Assert.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@SpringBootTest
public class PaymentServiceTest {
	
	//Field
    @Autowired
    @Qualifier("paymentServiceImpl")
    PaymentService paymentService;
    
    @Autowired
    @Qualifier("meetingServiceImpl")
    MeetingService meetingService;

    @Test
    public void addPaymentTest() throws Exception{
    	
    	Payment payment = new Payment();
    	
    	payment.setPayNo("imp_123456789020");
    	payment.setUserNo(3);
    	payment.setMeetingNo(3);
    	payment.setMeetingName("test");
    	payment.setPayTime(LocalDateTime.now());
    	payment.setRefundTime(LocalDateTime.now());
    	payment.setPayState(1);
    	payment.setEntryFee(5000);
    	
    	paymentService.addPayment(payment);
    	
    	//payment = paymentService.getPayment("imp_123456789015");
    	
    	//Assert.assertEquals("imp_123456789014", payment.getPayNo());
 
  
    }
    
    //@Test
    public void getPaymentTest() throws Exception{
    	
    	Payment payment = new Payment();
    	
    	payment = paymentService.getPayment("imp_123456789016");
    	
    	//콘솔확인
    	System.out.println(payment);
    	
    	assertEquals("imp_123456789016", payment.getPayNo());
	
    }
    
    //@Test
    public void getPaymentListTest() throws Exception{
    	
    	List<Payment> paymentList = paymentService.getPaymentList(1);
    	
    	assertNotNull(paymentList);
    	
    	for(Payment payment : paymentList) {
    		System.out.println(payment);
    	}
    	
    }
    
    //@Test
    public void updatePaymentTest() throws Exception{
    	
    	Payment payment = new Payment();
    	
    	//업데이트 전
    	payment = paymentService.getPayment("imp_123456789016");
    	
    	int userNo = payment.getUserNo();
    	int meetingNo = payment.getMeetingNo();
    	
    	//payState 1->2 
    	paymentService.updatePayment(userNo, meetingNo);
    	
    	//업데이트 후
    	payment = paymentService.getPayment("imp_123456789016");
    	
    	assertEquals(2, payment.getPayState());   	
    	
    }
    
    //@Test
    public void updateAdjustmentTest() throws Exception{
    	
    	Meeting meeting = new Meeting();
    	
    	meeting = meetingService.getMeeting(2);
    
    	meeting.setAdjustmentTime(Date.valueOf(LocalDate.now()));
    	meeting.setAdjustmentState(0);
    	meeting.setBankName("우리은행");   
    	meeting.setAccountNo("12312312312");
    	paymentService.updateAdjustment(meeting);
    	
    	meeting = meetingService.getMeeting(2);
    	System.out.println("업데이트 왜 안돼"+meeting.toString());
    	//assertEquals("우리은행", meeting.getBankName());
    	//assertEquals(1, meeting.getAdjustmentState());
    	
    }
    
    @Test
    public void updateAccountTest() throws Exception{
    	
    	User user = new User();
    	
    	//userService가 없다!
    	
    }
    
}

