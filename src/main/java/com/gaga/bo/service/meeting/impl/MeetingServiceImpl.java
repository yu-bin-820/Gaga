package com.gaga.bo.service.meeting.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.gaga.bo.service.domain.Filter;
import com.gaga.bo.service.domain.Meeting;
import com.gaga.bo.service.domain.MeetingReview;
import com.gaga.bo.service.meeting.MeetingDao;
import com.gaga.bo.service.meeting.MeetingService;

@Service
public class MeetingServiceImpl implements MeetingService {
	
	///field
	@Autowired
	@Qualifier("meetingDao")
	private MeetingDao meetingDao;
	
	///constructor
	public MeetingServiceImpl() {
		System.out.println(this.getClass());
	}
	

	@Override
	public Meeting getMeeting(int meetingNo) throws Exception {
		// TODO Auto-generated method stub
		
		return meetingDao.getMeeting(meetingNo);
	}

	@Override
	public void addMeeting(Meeting meeting) throws Exception {
		// TODO Auto-generated method stub
		//System.out.println(meeting);
		meetingDao.addMeeting(meeting);
	}


	@Override
	public void updateMeeting(Meeting meeting) throws Exception {
		// TODO Auto-generated method stub
		meetingDao.updateMeeting(meeting);
	}


	@Override
	public void updateMeetingSuccess(Meeting meeting) throws Exception {
		// TODO Auto-generated method stub
		meetingDao.updateMeetingSuccess(meeting);

	}


	@Override
	public void deleteMeeting(int meetingNo) throws Exception {
		// TODO Auto-generated method stub
		meetingDao.deleteMeeting(meetingNo);
		
	}


	@Override
	public List<Meeting> getMeetingListFromParentClubNo(int clubNo) throws Exception {
		// TODO Auto-generated method stub

		return meetingDao.getMeetingListFromParentClubNo(clubNo);
	}


	@Override
	public void addMeetingMember(Map<String, String> map) throws Exception {
		// TODO Auto-generated method stub
		meetingDao.addMeetingMember(map);
		
	}


	@Override
	public void updateMember(Map<String, String> map) throws Exception {
		// TODO Auto-generated method stub
		meetingDao.updateMember(map);

	}


	@Override
	public void deleteMeetingMember(Map<String, String> map) throws Exception {
		// TODO Auto-generated method stub
		meetingDao.deleteMeetingMember(map);

		
	}


	@Override
	public List<Meeting> getMyMeetingList(int userNo) throws Exception {
		// TODO Auto-generated method stub
		List<Meeting> list = meetingDao.getMyMeetingList(userNo);
		return list;
	}
	
	@Override
	public List<Meeting> getMeetingListInChat(int userNo) throws Exception {
		// TODO Auto-generated method stub
		return meetingDao.getMeetingListInChat(userNo);
	}
	
	@Override
	public List<Meeting> getMeetingList(Filter filter) throws Exception {
		// TODO Auto-generated method stub
		return  meetingDao.getMeetingList(filter);
	}
	

	@Override
	public List<Meeting> getMeetingListByKeyword(Map<String, String> map) throws Exception {
		// TODO Auto-generated method stub
		return meetingDao.getMeetingListByKeyword(map);
	}



	@Override
	public void addMeetingReview(MeetingReview meetingReview) throws Exception {
		// TODO Auto-generated method stub
		meetingDao.addMeetingReview(meetingReview);
		
	}


	@Override
	public MeetingReview getMeetingReview(int meetingReviewNo) throws Exception {
		// TODO Auto-generated method stub
		
		return meetingDao.getMeetingReview(meetingReviewNo);
	}


	@Override
	public void updateMeetingReview(MeetingReview meetingReview) throws Exception {
		// TODO Auto-generated method stub
		meetingDao.updateMeetingReview(meetingReview);

	}


	@Override
	public List<MeetingReview> getMeetingReviewList(int meetinNo) throws Exception {
		// TODO Auto-generated method stub
		List<MeetingReview> list = meetingDao.getMeetingReviewList(meetinNo);
		return list;
	}


	@Override
	public void deleteMeetingReview(int meetingReviewNo) throws Exception {
		// TODO Auto-generated method stub
		meetingDao.deleteMeetingReview(meetingReviewNo);

	}


	@Override
	public List<HashMap<Integer, String>> getMainCategory() throws Exception {
		// TODO Auto-generated method stub
		return meetingDao.getMainCategory();
	}


	@Override
	public List<HashMap<Integer, String>> getSubCategory() throws Exception {
		// TODO Auto-generated method stub
		return meetingDao.getSubCategory();
	}




}
