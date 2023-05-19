package com.gaga.bo.web.meeting;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gaga.bo.service.domain.Meeting;
import com.gaga.bo.service.meeting.MeetingService;
import com.gaga.bo.service.user.UserService;

@RestController
@RequestMapping("/rest/meeting/*")
public class MeetingRestController {
	
	///Field
	@Autowired
	@Qualifier("meetingServiceImpl")
	private MeetingService meetingService;
	
	
	@Autowired
	@Qualifier("userServiceImpl")
	private UserService userService;
	
	public MeetingRestController() {
		System.out.println(this.getClass());
	}
	
	//미팅관련
	@GetMapping("no/{meetingNo}")
	public Meeting getMeeting( @PathVariable int meetingNo) throws Exception{
		//System.out.println(meetingNo);
		return meetingService.getMeeting(meetingNo);
	}
	
	@PatchMapping("/")
	public void updateMeeting(@RequestBody Meeting meeting) throws Exception{
		
	}
	
	@PostMapping("/")
	public void addMeeting(@RequestBody Meeting meeting) throws Exception{
		
	}
	
	@DeleteMapping("/")
	public void deleteMeeting(@RequestBody Meeting meeting)throws Exception{
		
	}
	
	
	//미팅리뷰관련
	//@PostMapping("/review")
	//public void addMeeting(@RequestBody Meeting meeting) throws Exception{
	
	//@
	

}
