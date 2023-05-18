package com.gaga.bo.service.payment.test;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.gaga.bo.service.community.CommunityService;
import com.gaga.bo.service.domain.Payment;
import com.gaga.bo.service.payment.PaymentService;

import junit.framework.Assert;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;

@SpringBootTest
public class PaymentServiceTest {
	
	//Field
    @Autowired
    @Qualifier("paymentServiceImpl")
    PaymentService paymentService;

    //@Test
    public void addPaymentTest() throws Exception{
    	
    	Payment payment = new Payment();
    	
    	payment.setPayNo("imp_123456789014");
    	payment.setUserNo(1);
    	payment.setMeetingNo(1);
    	payment.setMeetingName("test");
    	payment.setPayTime(LocalDateTime.now());
    	payment.setRefundTime(LocalDateTime.now());
    	payment.setPayState(1);
    	payment.setEntryFee(5000);
    	
    	paymentService.addPayment(payment);
    	
    	payment = paymentService.getPayment("imp_123456789014");
    	
    	Assert.assertEquals("imp_123456789014", payment.getPayNo());
 
  
    }
    
    //@Test
    public void getPaymentTest() throws Exception{
    	
    	Payment payment = new Payment();
    	
    	payment = paymentService.getPayment("imp_123456789012");
    	
    	//�ܼ�Ȯ��
    	System.out.println(payment);
    	
    	assertEquals("imp_123456789012", payment.getPayNo());
	
    }
    
    @Test
    public void updatePaymentTest() throws Exception{
    	
    	Payment payment = new Payment();
    	
    	//업데이트 전
    	payment = paymentService.getPayment("imp_123456789012");
    	
    	//payState 1->2
    	paymentService.updatePayment(payment);
    	
    	//업데이트 후
    	payment = paymentService.getPayment("imp_123456789012");
    	
    	assertEquals(2, payment.getPayState());   	
    	
    	
    }
}

