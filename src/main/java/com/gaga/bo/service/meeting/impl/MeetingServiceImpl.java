package com.gaga.bo.service.meeting.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.gaga.bo.service.domain.Meeting;
import com.gaga.bo.service.meeting.MeetingDao;
import com.gaga.bo.service.meeting.MeetingService;

@Service
public class MeetingServiceImpl implements MeetingService {
	
	@Autowired
	@Qualifier("meetingDao")
	private MeetingDao meetingDao;
	
	public MeetingServiceImpl() {
		
	}

	@Override
	public Meeting getMeeting(int meetingNo) {
		// TODO Auto-generated method stub
		
		return meetingDao.getMeeting(meetingNo);
	}

	@Override
	public void addMeeting(Meeting meeting) {
		// TODO Auto-generated method stub
		System.out.println(meeting);
		meetingDao.addMeeting(meeting);
	}

}
