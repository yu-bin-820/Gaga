package com.gaga.bo.service.meeting.test;

import java.sql.Time;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;

import com.gaga.bo.service.domain.Filter;
import com.gaga.bo.service.domain.Meeting;
import com.gaga.bo.service.domain.MeetingReview;
import com.gaga.bo.service.meeting.MeetingService;

@SpringBootTest
public class MeetingServiceTest {
	
	@Autowired
	@Qualifier("meetingServiceImpl")
	MeetingService meetingService;
	
	//@Test
	public void testGetMeeting() throws Exception{
		
		Meeting meeting = new Meeting();
		
		meeting = meetingService.getMeeting(1);
		
		Assert.assertEquals("Meeting 1", meeting.getMeetingName());
		Assert.assertEquals("Seoul", meeting.getMeetingAddr());
		Assert.assertEquals("Introduction 1", meeting.getMeetingIntro());
		Assert.assertEquals(37.123456, meeting.getMeetingLat(),0);
		Assert.assertEquals(127.654321, meeting.getMeetingLng(),0);
		Assert.assertEquals(0, meeting.getEntryFee());
		//Assert.assertEquals("2023-05-17", meeting.getMeetingDate());
		//Assert.assertEquals("12:00:00", meeting.getMeetingStartTime());
		//Assert.assertEquals("15:00:00", meeting.getMeetingEndTime());
		Assert.assertEquals(1, meeting.getMeetingSuccess());
		Assert.assertEquals("123 Main Street", meeting.getMeetingDetailAddr());


	}
	
	//@Test
	public void testAddMeeting() throws Exception{
		
		Meeting meeting = new Meeting();
		
        meeting.setEntryFee(0);
        meeting.setMeetingDate(new java.sql.Date(new Date().getTime()));
        meeting.setMeetingStartTime(new Time(10, 0, 0));
        meeting.setMeetingEndTime(new Time(12, 0, 0));
        meeting.setMeetingAddr("Sample Address");
        meeting.setMeetingDetailAddr("Sample Detail Address");
        meeting.setMeetingLat(37.123456);
        meeting.setMeetingLng(127.123456);
        meeting.setMeetingName("Sample Meeting");
        meeting.setMeetingIntro("Sample Introduction");
        meeting.setMeetingLeaderNo(1);
        meeting.setMeetingMaxMemberNo(20);
        meeting.setMeetingRegDate(new java.sql.Date(new Date().getTime()));
        meeting.setMeetingImg("sample.jpg");
        meeting.setFilterGender(1);
        meeting.setFilterMinAge(20);
        meeting.setFilterMaxAge(40);
        meeting.setMainCategoryNo(1);
        meeting.setFilterTag("sample");
        //meeting.setParentClubNo(1);
		
		meetingService.addMeeting(meeting);
		
	}
	
	//@Test
	public void testUpdateMeeting() throws Exception{
		
		Meeting meeting = meetingService.getMeeting(9);
		Assert.assertNotNull(meeting);
		
		Assert.assertEquals("Sample Meeting", meeting.getMeetingName());
		Assert.assertEquals("sample.jpg", meeting.getMeetingImg());
		Assert.assertEquals("Sample Introduction", meeting.getMeetingIntro());
		
        meeting.setMeetingName("Update Sample Meeting");
        meeting.setMeetingImg("updatesample.jpg");
        meeting.setMeetingIntro("Update Sample Introduction");
        
        meetingService.updateMeeting(meeting);
        
        meeting = meetingService.getMeeting(meeting.getMeetingNo());
		Assert.assertNotNull(meeting);
        
		Assert.assertEquals("Update Sample Meeting", meeting.getMeetingName());
		Assert.assertEquals("updatesample.jpg", meeting.getMeetingImg());
		Assert.assertEquals("Update Sample Introduction", meeting.getMeetingIntro());

	}
	
	//@Test
	public void testUpdateMeetingSuccess() throws Exception{
		
		Meeting meeting = meetingService.getMeeting(9);
		Assert.assertNotNull(meeting);
		
		Assert.assertEquals("Update Sample Meeting", meeting.getMeetingName());
		Assert.assertEquals("updatesample.jpg", meeting.getMeetingImg());
		Assert.assertEquals(0, meeting.getMeetingSuccess());
		
		
        meeting.setMeetingImg("updatesample.jpg");
        meeting.setMeetingIntro("Update Sample Introduction");
        
        meetingService.updateMeetingSuccess(meeting);
        
        meeting = meetingService.getMeeting(meeting.getMeetingNo());
		Assert.assertNotNull(meeting);
        
		Assert.assertEquals(1, meeting.getMeetingSuccess());
		Assert.assertEquals(1, meeting.getMeetingState());

	}
	
	//@Test
	public void testDeleteMeeting() throws Exception{
		
		meetingService.deleteMeeting(5);


	}
	
	//@Test
	public void testGetMeetingListFromParentClubNo() throws Exception{
		
		Map<String, Object> map = meetingService.getMeetingListFromParentClubNo(1);
		
		List<Object> list = (List<Object>)map.get("list");
		
		Assert.assertEquals(3, list.size());

	}
	
	//@Test
	public void testAddMeetingMember() throws Exception{
		
		
		Map<String, String> map = new HashMap<>();
		map.put("userNo", "1");
		map.put("meetingNo", "2");
				
				
		meetingService.addMeetingMember(map);

	}
	
	//@Test
	public void testUpdateMeetingMember() throws Exception{
		
		
		Map<String, String> map = new HashMap<>();
		map.put("memberNo", "1");
		map.put("userNo", "2");
		map.put("state", "1");
				
				
		meetingService.updateMember(map);

	}
	
	//@Test
	public void testDeleteMeetingMember() throws Exception{	
				
		Map<String, String> map = new HashMap<>();
		map.put("memberNo", "1");
		map.put("userNo", "2");
		
		meetingService.deleteMeetingMember(map);

	}
	
	@Test
	public void testGetMyMeetingList() throws Exception{	
				
		List<Meeting> list = meetingService.getMyMeetingList(1);
		
		Assert.assertEquals(4, list.size());

	}
	
    //@Test
    public void testAddMeetingReview() throws Exception {
        MeetingReview meetingReview = new MeetingReview();
        meetingReview.setMeetingNo(2);
        meetingReview.setMeetingScore(5);
        meetingReview.setMeetingReviewImg("review.jpg");
        meetingReview.setMeetingReviewContent("Great meeting!");
        meetingReview.setMeetingReviewerNo(1);
        
        meetingService.addMeetingReview(meetingReview);
        
    }
    
    //@Test
    public void testGetMeetingReview() throws Exception {
		MeetingReview meetingReview = new MeetingReview();
		
		meetingReview = meetingService.getMeetingReview(1);
        
		Assert.assertEquals(5, meetingReview.getMeetingScore(),0);
		Assert.assertEquals("review.jpg", meetingReview.getMeetingReviewImg());
		Assert.assertEquals("Great meeting!", meetingReview.getMeetingReviewContent());
    }
	
    //@Test
    public void testUpdateMeetingReview() throws Exception {
    	
        MeetingReview meetingReview = new MeetingReview();
        meetingReview.setMeetingReviewNo(1);
        meetingReview.setMeetingScore(2);
        meetingReview.setMeetingReviewImg("updatereview.jpg");
        meetingReview.setMeetingReviewContent("updateGreat meeting!");
        
        meetingService.updateMeetingReview(meetingReview);
        
    }
    
	//@Test
	public void testGetMeetingReviewList() throws Exception{	
				
		List<MeetingReview> list = meetingService.getMeetingReviewList(2);
		
		Assert.assertEquals(1, list.size());

	}
	
	//@Test
	public void testDeleteMeetingReview() throws Exception{	
				
		meetingService.deleteMeetingReview(1);

	}
	
	//@Test
	public void testGetMainCategory() throws Exception{
		
		List<HashMap<Integer, String>> list = meetingService.getMainCategory();
		
		Assert.assertEquals(6, list.size());

		
	}
	
	//@Test
	public void testGetSubCategory() throws Exception{
		
		List<HashMap<Integer, String>> list = meetingService.getSubCategory(5);
		
		Assert.assertEquals(7, list.size());

		
	}
	
	
	//@Test
	public void testGetMeetingListInChat() throws Exception{
		
		List<Meeting> list = meetingService.getMeetingListInChat(1);
		
		Assert.assertEquals(0, list.size());

		
	}
	
	//@Test
	public void testGetMeetingList() throws Exception{
		
		Filter filter = new Filter();
		
		filter.setGender(1);
		filter.setMaxAge(80);
		filter.setMinAge(10);
		filter.setAge(22);
		filter.setMainCategoryNo(1);
		//filter.setTag("Tag 2");
		filter.setSwLat(0);
		filter.setNeLat(1000);
		filter.setSwLng(0);
		filter.setNeLng(1000);

		
		List<Meeting> list = meetingService.getMeetingList(filter);
		
		Assert.assertEquals(2, list.size());

		
	}
	

}
