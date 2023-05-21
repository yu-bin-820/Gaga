package com.gaga.bo.web.meeting;

import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gaga.bo.service.domain.Meeting;
import com.gaga.bo.service.domain.MeetingReview;
import com.gaga.bo.service.meeting.MeetingService;
import com.gaga.bo.service.user.UserService;

@RestController
@RequestMapping("/rest/meeting")
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
	
	@PatchMapping("")
	public void updateMeeting(@RequestBody Meeting meeting) throws Exception{
		meetingService.updateMeeting(meeting);
	}
	
	//test 미완료
	@PatchMapping("meetingsuccess")
	public void updateMeetingSuccess(@RequestBody Meeting meeting) throws Exception{
		meetingService.updateMeetingSuccess(meeting);
	}
	
	@PostMapping("")
	public void addMeeting(@RequestBody Meeting meeting) throws Exception{
		System.out.println("Controller에넘어온meeting정보:"+meeting);
		meetingService.addMeeting(meeting);

	}
	
	@DeleteMapping("")
	public void deleteMeeting(@RequestBody Meeting meeting)throws Exception{
		meetingService.deleteMeeting(meeting.getMeetingNo());
	}
	
	@GetMapping("list/mymeeting/{userNo}")
	public List listMymeeting(@PathVariable int userNo ) throws Exception{
		
		return meetingService.getMyMeetingList(userNo);
	}
	
	@PostMapping("member")
	public void addMember(@RequestBody Map<String, String> requestParams) throws Exception{
		
		meetingService.addMeetingMember(requestParams);
	}
	
	@PatchMapping("member")
	public void updateMember(@RequestBody Map<String, String> requestParams) throws Exception{
		
		meetingService.updateMember(requestParams);
	}
	
	@DeleteMapping("member")
	public void DeleteMember(@RequestBody Map<String, String> requestParams) throws Exception{
		
		meetingService.deleteMeetingMember(requestParams);
	}
	
	//미팅리뷰관련
	@PostMapping("review")
	public void addMeetingReview(@RequestBody MeetingReview meetingReview) throws Exception{
        meetingService.addMeetingReview(meetingReview);

	}
	
	@GetMapping("review/{meetingNo}")
	public List<MeetingReview> getMeetingReviewList(@PathVariable int meetinNo) throws Exception {
		
		return meetingService.getMeetingReviewList(meetinNo);
	}
	

}
