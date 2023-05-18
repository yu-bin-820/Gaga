package com.gaga.bo.service.meeting.test;

import java.sql.Time;
import java.util.Date;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;

import com.gaga.bo.service.domain.Meeting;
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
	
	@Test
	public void testAddMeeting() throws Exception{
		
		Meeting meeting = new Meeting();
		
        meeting.setEntryFee(0);
        meeting.setMeetingDate(new java.sql.Date(new Date().getTime()));
        meeting.setMeetingStartTime(new Time(10, 0, 0));
        meeting.setMeetingEndTime(new Time(12, 0, 0));
        meeting.setMeetingSuccess(1);
        meeting.setMeetingAddr("Sample Address");
        meeting.setMeetingDetailAddr("Sample Detail Address");
        meeting.setMeetingLat(37.123456);
        meeting.setMeetingLng(127.123456);
        meeting.setMeetingName("Sample Meeting");
        meeting.setMeetingIntro("Sample Introduction");
        meeting.setMeetingLeaderNo(1);
        meeting.setMeetingMaxMemberNo(20);
        meeting.setMeetingRegDate(new java.sql.Date(new Date().getTime()));
        meeting.setMeetingState(1);
        meeting.setMeetingImg("sample.jpg");
        meeting.setFilterGender(1);
        meeting.setFilterMinAge(20);
        meeting.setFilterMaxAge(40);
        meeting.setFilterTag("sample");
		
		meetingService.addMeeting(meeting);
		
	}

}
