package com.gaga.bo.aop;



import java.util.HashMap;
import java.util.Map;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.gaga.bo.service.club.ClubService;
import com.gaga.bo.service.domain.Club;
import com.gaga.bo.service.domain.Meeting;
import com.gaga.bo.service.meeting.MeetingService;

@Aspect
@Component
public class AlarmAspect {
	
	///field
	@Value("${expressHost}")
	private String expressHost;
	
	@Autowired
	@Qualifier("clubServiceImpl")
	private ClubService clubService;
	
	@Autowired
	@Qualifier("meetingServiceImpl")
	private MeetingService meetingService;
	
	
	public AlarmAspect() {
	
		System.out.println(this.getClass());
	
	}
	
	@SuppressWarnings("unchecked")
	@AfterReturning(pointcut = "execution(* com.gaga.bo.web..*.updateMember(..))", returning = "result")
	public void afterMemberUpdate(JoinPoint joinPoint, Object result) throws Exception {
		System.out.println(" :: afterMemberUpdate ::");
		Object[] args = joinPoint.getArgs();
		
		Map<String,String> member = (Map<String,String>) args[0];
		Map<String, Object> alarmReq = new HashMap<String,Object>();
		Map<String, Object> groupChatReq = new HashMap<String,Object>();
		
		String alarmUrl = expressHost+"/rest/chat/alarm";
//		String url = expressHost+"/rest/chat/alarm";

		
		if(member.get("meetingNo") != null) {
			Meeting meeting = meetingService.getMeeting(Integer.parseInt(member.get("meetingNo")));
			alarmReq.put("content", meeting.getMeetingName()+"모임의 확정 멤버가 되었습니다.");
			alarmReq.put("path","/meeting/meetingno/" + meeting.getMeetingNo());
			
		} else {
			Club club = clubService.getClub(Integer.parseInt(member.get("clubNo")));
			alarmReq.put("content", club.getClubName()+"클럽의 확정 멤버가 되었습니다.");
			alarmReq.put("path","/club/no/" + club.getClubNo());
			
		}
		
		RestTemplate restTemplate = new RestTemplate();
		
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
				
		alarmReq.put("receiverNo",member.get("userNo"));
		
        HttpEntity<Map<String, Object>> alarmEntity = new HttpEntity<Map<String, Object>>(alarmReq, headers);
        
        ResponseEntity<String> alarmResponse = restTemplate.postForEntity(alarmUrl, alarmEntity, String.class);

        System.out.println(alarmResponse.getBody());

	}

}
