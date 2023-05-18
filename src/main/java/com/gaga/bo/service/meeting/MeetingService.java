package com.gaga.bo.service.meeting;

import java.util.List;
import java.util.Map;

import com.gaga.bo.service.domain.Meeting;
import com.gaga.bo.service.domain.MeetingReview;

public interface MeetingService {
	
	public Meeting getMeeting(int meetingNo) throws Exception;
	
	public Map<String, Object> getMeetingListFromRarentClubNo(int clubNo) throws Exception;
	
	public List<Meeting> getMyMeetingList(int userNo) throws Exception;
	
	public void addMeeting(Meeting meeting) throws Exception;
	
	public void updateMeeting(Meeting meeting) throws Exception;
	
	public void updateMeetingSuccess(Meeting meeting) throws Exception;
	
	public void deleteMeeting(int meetingNo) throws Exception;
	
	public void addMeetingMember(Map<String, String> map) throws Exception;

	public void updateMember(Map<String, String> map) throws Exception;
	
	public void deleteMeetingMember(int memberNo) throws Exception;

	
	public void addMeetingReview(MeetingReview meetingReview) throws Exception;
	
	public MeetingReview getMeetingReview(int meetingReviewNo) throws Exception;
	
	public void updateMeetingReview(MeetingReview meetingReview) throws Exception;
	
	public List<MeetingReview> getMeetingReviewList(int meetinNo) throws Exception;
	
	public void deleteMeetingReview(int meetingReviewNo) throws Exception;


}
