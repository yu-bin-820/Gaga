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
import com.gaga.bo.service.domain.User;
import com.gaga.bo.service.meeting.MeetingService;
import com.gaga.bo.service.user.UserService;

@Aspect
@Component
public class AlarmAspect {
	
	///field
	@Value("${expressHost}")
	private String expressHost;
	
	@Autowired
	@Qualifier("userServiceImpl")
	private UserService userService;
	
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
		String groupChatUrl = expressHost+"/rest/chat";

		User user = userService.getUser(Integer.parseInt(member.get("userNo")));
		
		alarmReq.put("receiverNo",member.get("userNo"));

		
		groupChatReq.put("content", user.getNickName()+"님이 입장하셨습니다.");
		groupChatReq.put("contentTypeNo", 101);
		
		if(member.get("meetingNo") != null) {
			Meeting meeting = meetingService.getMeeting(Integer.parseInt(member.get("meetingNo")));
			alarmReq.put("content", meeting.getMeetingName()+"모임의 확정 멤버가 되었습니다.");
			alarmReq.put("path","/meeting/meetingno/" + meeting.getMeetingNo());
			
			groupChatReq.put("groupNo", member.get("meetingNo"));
			groupChatUrl=groupChatUrl+"/meeting/message";
		} else {
			Club club = clubService.getClub(Integer.parseInt(member.get("clubNo")));
			alarmReq.put("content", club.getClubName()+"클럽의 확정 멤버가 되었습니다.");
			alarmReq.put("path","/club/no/" + club.getClubNo());
			
			groupChatReq.put("groupNo", member.get("clubNo"));
			groupChatUrl=groupChatUrl+"/club/message";

		}
		
		RestTemplate restTemplate = new RestTemplate();
		
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> alarmEntity = new HttpEntity<Map<String, Object>>(alarmReq, headers);
        HttpEntity<Map<String, Object>> groupChatEntity = new HttpEntity<Map<String, Object>>(groupChatReq, headers);
        
        ResponseEntity<String> alarmResponse = restTemplate.postForEntity(alarmUrl, alarmEntity, String.class);
        ResponseEntity<String> groupChatResponse = restTemplate.postForEntity(groupChatUrl, groupChatEntity, String.class);

        System.out.println(" :: 확정 멤버 aop :: ararmRes :: "+alarmResponse.getBody());
        System.out.println(" :: 확정 멤버 aop :: groupChatRes :: "+groupChatResponse.getBody());

	}
	
	@AfterReturning(pointcut = "execution(* com.gaga.bo.web..*.addMeeting(..))", returning = "result")
	public void afterAddMeeting(JoinPoint joinPoint, Object result ) throws Exception {
		System.out.println(" :: afterAddMeeting ::");
		Object[] args = joinPoint.getArgs();
		
		Meeting argMeeting = (Meeting)args[0];

		
		Meeting meeting = meetingService.getMeeting((Integer)result);
		String groupChatUrl = expressHost+"/rest/chat";
		
		System.out.println(" :: result meetingNo :: " + (Integer)result);
		System.out.println(" :: meeting :: " + meeting);
		
		Map<String, Object> req = new HashMap<String,Object>();
        
		if (argMeeting.getParentClubNo() != 0) {
			
			groupChatUrl += "/club/message";
			meeting.setParentClubNo(argMeeting.getParentClubNo());
			req.put("groupNo", meeting.getParentClubNo());
			
		} else if (argMeeting.getParentMeetingNo() != 0 ) {
			
			groupChatUrl += "/meeting/message";
			meeting.setParentMeetingNo(argMeeting.getParentMeetingNo());
			req.put("groupNo", meeting.getParentMeetingNo());
			
		}
		
		if(meeting.getParentClubNo() != 0 || meeting.getParentMeetingNo() != 0) {
			
			System.out.println(groupChatUrl);
			
			req.put("senderNo", meeting.getMeetingLeaderNo());
			req.put("content", meeting);
			req.put("contentTypeNo", 102);
			RestTemplate restTemplate = new RestTemplate();
					
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			
			HttpEntity<Map<String, Object>> groupChatEntity = new HttpEntity<Map<String, Object>>(req, headers);
	        ResponseEntity<String> groupChatRes = restTemplate.postForEntity(groupChatUrl, groupChatEntity, String.class);
	                
	        System.out.println(" :: 타 모임 기반 aop :: res :: " + groupChatRes.getBody());
		}
	}

}
