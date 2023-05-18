package com.gaga.bo.service.meeting;

import org.apache.ibatis.annotations.Mapper;

import com.gaga.bo.service.domain.Meeting;
import com.gaga.bo.service.domain.MeetingReview;

@Mapper
public interface MeetingDao {

	public Meeting getMeeting(int meetingNo);
	
	public void addMeeting(Meeting meeting);
	
	//미팅 리뷰
	//public void addMeetingReview(MeetingReview meetingReview);
	
	//public void getMeetingReview(int meetingReviewNo);
	
	
}
