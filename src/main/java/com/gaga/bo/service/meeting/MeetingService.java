package com.gaga.bo.service.meeting;

import com.gaga.bo.service.domain.Meeting;

public interface MeetingService {
	
	public Meeting getMeeting(int meetingNo);
	
	public void addMeeting(Meeting meeting);

}
